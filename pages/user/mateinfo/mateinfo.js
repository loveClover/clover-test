// pages/user/mateinfo/mateinfo.js
const infoDetailArray = require('../../../utils/infodetail.js');

Page({

	data: {
		userInfo: {
			agerange: ['不限','不限'], heightrange: ['不限','不限'], education: '', ismarry: '', income: '',
			city: ['广东省', '深圳市', '南山区'], haschild: '', wantchild: '', bodysize: '', smoke: '', drink: '', hasphoto: ''
		},
		infoDetailArray: null,
		ageRangeIndex:[0,0],
		ageRangeArray:[['不限'],['不限']],
		heightRangeIndex:[0,0],
		heightRangeArray: [['不限'], ['不限']],
		multiArray: [[], []],
		multiIndex: [0,0]
	},

	onLoad: function (options) {
		this.setData({
			infoDetailArray: infoDetailArray,
			ageRangeArray: infoDetailArray.agerange,
			heightRangeArray: infoDetailArray.heightrange
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

	//普通单个选择器
	bindPickerOneChange: function (e) {
		let type = e.currentTarget.dataset.type,
			index = e.detail.value,
			userInfo = this.data.userInfo;
		userInfo[type] = infoDetailArray[type][index];
		this.setData({
			userInfo: userInfo
		})
	},

	//城市选择器
	bindPickerThreeChange: function (e) {
		let type = e.currentTarget.dataset.type,
			array = e.detail.value,
			userInfo = this.data.userInfo;
		userInfo[type] = array;
		this.setData({
			userInfo: userInfo
		})
	},

	//多列选择器(两列)
	bindMultiPickerTwoChange:function(e){
		let info = this.data.userInfo;
		if (e.currentTarget.dataset.type == 'agerange') {
			info.agerange = [this.data.ageRangeArray[0][e.detail.value[0]], this.data.ageRangeArray[1][e.detail.value[1]]]
		} else if (e.currentTarget.dataset.type == 'heightrange') {
			info.heightrange = [this.data.heightRangeArray[0][e.detail.value[0]], this.data.heightRangeArray[1][e.detail.value[1]]]
		}
		this.setData({
			userInfo:info
		})
	},
	bindMultiPickerTwoColumnChange:function(e){
		if(e.detail.column == 0){
			let array = [[], []],
					start = 0,
					max = 0;
			if (e.currentTarget.dataset.type == 'agerange') {
				array = this.data.ageRangeArray;
				max = 100;
			} else if (e.currentTarget.dataset.type == 'heightrange') {
				array = this.data.heightRangeArray;
				max = 200;
			}

			array[1] = ['不限'];
			if (array[0][e.detail.value] == '不限'){
				start = array[0][e.detail.value+1];
			}else{
				start = array[0][e.detail.value]+1;
			}
			for (let i = start; i < max; i++){
				array[1].push(i);
			}
			if (e.currentTarget.dataset.type == 'agerange') {
				this.setData({ageRangeArray: array})
			} else if (e.currentTarget.dataset.type == 'heightrange') {
				this.setData({heightRangeArray: array})
			}
			
		}
	}
})