const mPromisify = require('../utils/promisify.js'),
  Promise = require('../utils/promise.min.js'),
  mConfig = require('./config.js'),
  mBaseHelper = require('./baseHelper.js'),
  mLoginHelper = require('./loginHelper.js');

const getParams = (url)=>{
  let index = url.indexOf('?');
  if(index<0){
    return {};
  }
  url = url.substr(index+1);
  let args = url.split('&'),
    ret = {};
  args.forEach(function(t){
    t = t.split('=');
    if(t.length>1){
      ret[t[0]] = t[1];
    }
  });
  return ret;
};

const formatPlayTime = function(sec){
  let xs = [], t;
  for(let i=0; i<3; i++){
    t = +sec % 60;
    xs.splice(0, 0, t < 10 ? '0' + t : t);
    sec = Math.floor(+sec / 60);
    if (sec<1){
      break;
    }
  }
  if (xs.length<2){
    xs.splice(0, 0, '00');
  }

  return xs.join(':');
};

const formatTime = function(timestamp) {
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }

  var curTimestamp = parseInt(new Date().getTime() / 1000, 10);
  var timestampDiff = curTimestamp - timestamp;

  var curDate = new Date(curTimestamp * 1000);
  var tmDate = new Date(timestamp * 1000);

  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

  if (timestampDiff < 60) {
    return "刚刚";
  } else if (timestampDiff < 3600) {
    return Math.floor(timestampDiff / 60) + "分钟前";
  } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
    return '今天 ' + zeroize(H) + ':' + zeroize(i);
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000);
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return '昨天 ' + zeroize(H) + ':' + zeroize(i);
    } else if (curDate.getFullYear() == Y) {
      return zeroize(m) + '月' + zeroize(d) + '日 ';
    } else {
      return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ';
    }
  }
};

const getTimeStamp = (datestr) => {
  let str = datestr,
  time = new Date(str.substr(0, 4), parseInt(str.substr(5, 2), 10) - 1, parseInt(str.substr(8, 2), 10), parseInt(str.substr(11, 2), 10), parseInt(str.substr(14, 2), 10), parseInt(str.substr(17, 2), 10));
  return Math.ceil(time.getTime() / 1000);
};

const formatDateTime = (timestamp)=>{
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }

  var curDate = new Date();
  var tmDate = new Date(timestamp * 1000);

  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

  var str = '';
  if (curDate.getFullYear() == Y) {
    str = zeroize(m) + '月' + zeroize(d) + '日 ';
  } else {
    str = Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ';
  }

  str += ' ' + zeroize(H) + ':' + zeroize(i);
  return str;
};

const tf = function (fn) {
  return fn || (() => { });
};

const syncUserStatus = (mdata, callback)=>{
  mBaseHelper.request({
    url: mConfig.APIURL + '/vdo/syncstatus', //GET_FILE_LIST
    method: 'POST',
    data: mdata
  }).then(data=>{
    if (callback){
      callback(data.result.data || 0);
    }
  }).catch(err=>{
    console.error(err);
  });
};

const waitUserLogin = (callback)=>{
  let gData = getApp().globalData;
  if (mLoginHelper.isLogin()) {
    return callback(gData.userInfo);
  } else {
    wx.getSetting({
      success: res => {
        console.log(res);
        if (typeof res.authSetting['scope.userInfo'] == 'undefined' || res.authSetting['scope.userInfo']) {
          mLoginHelper.startToLogin(function (ret, msg) {
            return callback(gData.userInfo, msg);
          });
        } else if (res.authSetting['scope.userInfo'] === false) {
          mBaseHelper.showAlert({
            content: '你需要先允许授权获取你的用户信息才能查看相关信息',
            showCancel: true,
            success: function (e) {
              if (e.confirm) {
                wx.navigateTo({
                  url: '/pages/error/authdeny?furl=' + mBaseHelper.currentPage().route
                });
              }
            }
          });
        }
      }
    })
  }
};

let _reqOptions = null;
const _request = function(options){
  _reqOptions = options;

  return new Promise((resolve, reject) => {
    mBaseHelper.request(options).then(function (ret) {
      //登录失败
      if (ret.result && ret.result.code == -66666) {
        mLoginHelper.changeUserInfo({ sessionid: '' });
        waitUserLogin(function(){
          return mBaseHelper.request(options).then(function (ret) {
            resolve(ret);
          }).catch(function (ret) {
            reject(ret);
          });
        });
      }else{
        resolve(ret)
      }
    }).catch(function(ret){
      reject(ret);
    });
  });
  
};

const queryUserInfo = function (senderid, callback){
  _request({
    url: mConfig.APIURL + '/uinfo',
    method: 'POST',
    data: {
      ids: senderid
    }
  }).then((ret) => {
    let jdata = ret.result;
    callback(jdata);
  }).catch((res) => {
    console.error(res);
    callback([]);
  });
};

const stripHtmlTag = (html)=>{
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

module.exports = {
  tf,
  formatTime,
  stripHtmlTag,
  getTimeStamp,
  formatPlayTime,
  waitUserLogin,
  queryUserInfo,
  syncUserStatus,
  formatDateTime,
  request: _request,
  reportErr: mBaseHelper.reportErr,
  reportMTA: mBaseHelper.reportMTA,
  alert: mBaseHelper.showAlert,
  getParams: getParams,
  Promise: Promise,
  wxpromise: mPromisify
};


