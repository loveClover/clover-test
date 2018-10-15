const mConfig = require('./config.js'),
  mBaseHelper = require('../helper/baseHelper.js');

let _callbacks = [],
  _lastLoginTime = 0;

const changeUserInfo = (info) => {
  let key = 'userdata-v1',
    mAppData = getApp().globalData;
  mAppData.userInfo = mAppData.userInfo || {};
  Object.assign(mAppData.userInfo, info || {});

  wx.setStorage({
    key: key,
    data: mAppData.userInfo,
    success: (res) => {
      console.log('change userinfo:', info, mAppData.userInfo);
    },
    fail: (res) => {
      console.log('error change:', res, info);
      wx.removeStorage({ key: key });
    },
  });
};

//sync userinfo to server
const syncUserInfo = (code, callback) => {
  let pGetUserInfo = mBaseHelper.mPromisify(wx.getUserInfo),
    mAppData = getApp().globalData;
  pGetUserInfo({
    withCredentials: true
  }).then((res) => {
    mBaseHelper.request({
      url: mConfig.APIURL + '/syncuinfo',
      method: 'POST',
      data: {
        ver: '1',
        code: code || '',
        sysInfo: JSON.stringify(mAppData.systemInfo),
        rawData: res.rawData,
        signature: res.signature,
        encryptedData: res.encryptedData,
        iv: res.iv,
        sessionid: ''
      }
    }).then((ret) => {
      let jdata = ret.result;
      if (!jdata || jdata.code!=0 || !jdata.data) {
        changeUserInfo({ sessionid: '' });
        return callback(false, '登录失败[' + jdata.code +']:' + jdata.msg);
      }

      let userInfo = jdata.data;
      userInfo._update = +(new Date());

      changeUserInfo(userInfo);
      callback(true, '同步用户状态成功!');
    }).catch((res) => {
      console.error(res);
      callback(false, '登录失败，请检查网络稍后重试!');
    });

    //get userinfo fail;
  }, (jErr) => {
    jErr = jErr || {};
    console.error(jErr);
    mBaseHelper.reportErr(jErr, true);
    callback(false, '登录失败，需要获得你的授权!');

    wx.navigateTo({
      url: '/pages/error/authdeny?furl=' + mBaseHelper.currentPage().route
    });
  });
};

const startToLogin = (callback) => {
  console.log('start login token!');
  if(callback){
    _callbacks.push(callback);
  }

  let now = (new Date).getTime();
  if (_lastLoginTime && (now - _lastLoginTime)<20000){
    return ;
  }

  _lastLoginTime = now;
  //get login code
  const pLogin = mBaseHelper.mPromisify(wx.login);
  pLogin().then((res) => {
    console.log('get login token:', res);
    if (!res.code) {
      return mBaseHelper.showAlert('获取登录态令牌失败！');
    }

    syncUserInfo(res.code, function(issuc, uinfo){
      _lastLoginTime = 0;
      let cbs = _callbacks.slice(0);
      _callbacks = [];
      cbs.forEach((cb)=>{
        cb(issuc, uinfo);
      });
    });
  }).catch(e => {
    return mBaseHelper.showAlert('获取微信登录令牌失败:' + e.errMsg);
  });
};

const isLogin = function(){
  let uinfo = getApp().globalData.userInfo;
  //
  return uinfo && ((new Date()).getTime() - uinfo._update > 3600000) && uinfo.sessionid && uinfo.uid;
};

module.exports = {
  isLogin,
  startToLogin,
  changeUserInfo
};