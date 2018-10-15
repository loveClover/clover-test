// pages/error/authdeny.js
const mBaseHelper = require('../../helper/baseHelper.js'),
  mAppHelper = require('../../helper/appHelper.js'),
  mLoginHelper = require('../../helper/loginHelper.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    furl: '',
    ishide: true,
    interval: 0
  },

  _authOk: function () {
    let self = this;
    mBaseHelper.showLoading();
    mLoginHelper.startToLogin(function () {
      console.log(self.data.furl);
      mBaseHelper.hideLoading();
      let mAppData = getApp().globalData;
      if (self.data.furl.indexOf('index/index')>-1){
        wx.switchTab({ url: self.data.furl });
      }else{
        wx.redirectTo({ url: self.data.furl, fail: function(e){
          if(e.errMsg.indexOf('tabbar')>-1){
            wx.switchTab({ url: self.data.furl });
          }
        } });
      }
    });
  },

  tapSetting: function (e) {
    let self = this;
    wx.openSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          self._authOk();
        }
      },
      fail: (res) => {
        console.error(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let self = this;
    self.data.furl = options.furl || '/pages/index/index';
    if (self.data.furl.substr(0, 1) != '/'){
      self.data.furl = '/' + self.data.furl;
    }
    wx.hideShareMenu();
    mLoginHelper.changeUserInfo({ sessionid: '' });
  },

  onShow: function () {
    let self = this;
    self.setData({
      ishide: false
    });
  },

  onHide: function () {
    let self = this;
    self.setData({
      ishide: true
    });
  },

  userInfoHandler: function(){
    mLoginHelper.startToLogin(function(e){
      wx.switchTab({
        url: '/pages/index/index',
        fail: function(e){
          console.error(e);
        }
      });
    });
  }
})