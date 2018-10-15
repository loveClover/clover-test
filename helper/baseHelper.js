const mConfig = require('./config.js'),
  Promise = require('../utils/promise.min.js'),
  mPromisify = require('../utils/promisify.js');

const currentPage = ()=>{
  let curPages = getCurrentPages(),
    curPage = curPages.length ? curPages[curPages.length - 1] : '';

  return curPage;
};

const request = (req) => {
  return new Promise((resolve, reject) => {
    req.data = req.data || {};
    req._start = +(new Date());
    delete req._reqhandle;

    let gData = getApp().globalData;
    if (typeof req.data == 'object'){
      req.data.sessionid = gData.userInfo.sessionid;
    }
    req.data.usershopid = gData.shopID;

    resolve._req = req;

    let reqhandle = null;
    req.success = (res) => {
      var jdata = res.data;
      let dotime = +(new Date()) - req._start;
      console.log('$receive$[' + dotime + 'ms]: ', jdata, res, req.data);
      if (res.statusCode == 200) {
        resolve({ result: jdata, resp: res, reqhandel: reqhandle });
      } else {
        reportErr(res);
        resolve({ result: null, resp: res, reqhandel: reqhandle });
      }
    };

    req.fail = (res) => {
      let dotime = +(new Date()) - req._start;
      console.error('$reqerror$[' + dotime + 'ms]', res);
      if (res && res.errMsg && res.errMsg.indexOf('fail abort') > -1) {
        return reject(res);
      }

      let network = getApp().globalData.networksuc;

      //判断断网
      if (network && res.errMsg.indexOf('Unable to resolve host') > -1) {
        network = false;
      }

      if (!network) {
        res.errMsg = '当前网络不可用，请检查网络是否正常';
        reportErr(res, true);
      } else {
        reportErr(res);
      }

      if (res.errMsg.indexOf('fail abort') > -1) {
        console.warn('request abort!');
        res = {};
      }

      res.reqhandel = reqhandle;
      reject(res);
    };

    reqhandle = wx.request(req);
    req._reqhandle = reqhandle;
  });
};

let _alertExist = 0;
const showAlert = text => {
  console.log('begin alert:', text);
  if (!text || ((new Date()).getTime()-_alertExist<20000)) return;

  let _def = {
    title: '提示',
    showCancel: false
  };

  if (typeof text == 'object') {
    Object.assign(_def, text);
  } else {
    _def.content = text || 'null';
  }

  _alertExist = (new Date()).getTime();
  _def._complete = _def.complete;
  _def.complete = (res)=>{
    _alertExist = 0;
  };

  return wx.showModal(_def);
};

var _lastReportErr = '';
const reportErr = (jErr, noAlert) => {
  console.error('ERROR:', jErr);

  jErr.errMsg = jErr.errMsg || '';
  if (jErr.errMsg.indexOf('fail:interrupted') > -1 || jErr.errMsg.indexOf('fail abort') > -1) {

  } else if (jErr.errMsg) {
    let msg = JSON.stringify(jErr);
    if (_lastReportErr != msg){
      _lastReportErr = msg;
      //reportMTA('errport', 'error', msg, getApp().globalData.userInfo.nickName);
    }

    msg = '出错啦，请稍后重试！';
    if (jErr.errMsg.indexOf('网络')>-1){
      msg = '请检查当前网络是否正常，稍后重试！';
    }
    if (!noAlert) showAlert(msg);
  }
};

const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const getCurrentPageRoute = () => {
  let curPage = getCurrentPages();
  if (curPage && curPage.length) {
    let route = curPage[curPage.length - 1].route;
    return route ? route.replace('pages/', '') : '';
  }
  return '';
};

const getCurrentPageQueryParams = ()=>{
  let curPage = getCurrentPages();
  if (curPage && curPage.length) {
    let str = serialize(curPage[curPage.length - 1].options);
    return str ? '?'+str : '';
  }
  return '';
};


let delayTimer = 0,
  toutTimer = 0;
const showLoading = function(text, delay){
  text = text || '加载中';
  delay = delay || 100;

  let _def = {
    title: '加载中',
    mask: true,
    timeout: 20000
  };

  if (typeof text == 'object') {
    Object.assign(_def, text);
  } else {
    _def.title = text || 'null';
  }

  clearTimeout(delayTimer);
  delayTimer = setTimeout(function () {
    wx.showLoading(_def);
  }, delay);

  if (_def.timeout > 0) {
    toutTimer = setTimeout(function () {
      wx.hideLoading();
    }, _def.timeout);
  }
};

const hideLoading = function (text) {
  clearTimeout(delayTimer);
  clearTimeout(toutTimer);
  wx.hideLoading();
};

const formatLimitTime = function (timestamp, curTimestamp) {
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }

  curTimestamp = curTimestamp || parseInt(new Date().getTime() / 1000, 10);
  var timestampDiff = Math.abs(curTimestamp - timestamp);

  var curDate = new Date(curTimestamp * 1000);
  var tmDate = new Date(timestamp * 1000);

  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

  if (timestampDiff < 3*60) {
    return "";
  } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
    return zeroize(H) + ':' + zeroize(i);
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000);
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return '昨天 ' + zeroize(H) + ':' + zeroize(i);
    } else if (curDate.getFullYear() == Y) {
      return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
    } else {
      return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
    }
  }
};

module.exports = {
  showLoading,
  hideLoading,
  request,
  reportErr,
  showAlert,
  mPromisify,
  Promise,
  formatLimitTime,
  currentPage
};
