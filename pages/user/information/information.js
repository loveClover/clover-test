// pages/user/information/information.js
const infoDetailArray = require('../../../utils/infodetail.js');

Page({

  data: {
		userInfo:{
			nickname:'',sex:'',birth:'',
			city: ['','',''], height: '', income: '', education: '', ismarry: '', haschild: '', wantchild: '', work: '', car: '', house: '',
			weight: '', bodysize: '', smoke: '', drink: '', constellation: '', ethnic: '', marrytime: '', showinfo: ''
		},
		infoDetailArray:null
  },

  onLoad: function (options) {
		this.setData({
			infoDetailArray: infoDetailArray
		})
  },

  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },

	bindPickerOneChange:function(e){
		let type = e.currentTarget.dataset.type,
				index = e.detail.value,
			userInfo = this.data.userInfo;
		userInfo[type] = infoDetailArray[type][index];
		this.setData({
			userInfo: userInfo
		})
	},

	bindPickerThreeChange:function(e){
		let type = e.currentTarget.dataset.type,
			array = e.detail.value,
			userInfo = this.data.userInfo;
		userInfo[type] = array;
		this.setData({
			userInfo: userInfo
		})
		console.log(e);
	}
})