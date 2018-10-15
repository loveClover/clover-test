// pages/index/index.js
const infoArray = [
	{ title: '年龄', code: 'age', list:['不限', '18岁以下', '18到29岁', '30到39岁', '40岁以上'] },
	{ title: '身高', code: 'height', list:['不限', '150以下', '150到160', '160到170', '170到180', '180以上'] },
	{ title: '学历', code: 'education', list:['不限', '高中及以下', '中专', '大专', '本科', '硕士','博士'] },
	{ title: '收入', code: 'income', list: ['不限', '3000元以下', '3001-5000元', '5001-8000元', '8001-12000元', '12001-20000元', '20001-50000元','50000元以上'] },
]

Page({

  data: {
		dataList: [],
		_gReq: null,
		_status: '',
		page: 0,
		isSelectShow:false,
		infoArray:[],
		selectedInfoArray:[0,0,0,0],
		age:0,					//0不限;1:<18;2:18~29;3:30~39;4:>40
		height: 0,			//0不限;1:<150;2:150~160;3:160~170;4:170~180;180+
		education: 0,		//0不限;1:<=高中;2:中专;3:大专;4:本科;5:硕士;6:博士
		income: 0				//0不限;1:<3k;2:3k~5k;3:5k~8k;4:8K~12K;5:12k~20K;6:20K~50K;7:50K+
  },

  onLoad: function (options) {
		this.getList();
		this.setData({
			infoArray: infoArray
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

	setStatus: function (status) {
		let self = this;
		if (status == 'ing') {
			wx.showNavigationBarLoading();
		} else {
			wx.hideNavigationBarLoading();
		}
		if (self.data._status != 'end') {
			self.setData({
				_status: status
			});
		}
	},

	getList: function (callback) {
		let self = this,
			pageSize = 20;
		if (self.data._status == 'ing') {
			if (self.data._gReq) {
				self.data._gReq.abort();
			}
		}

		//self.setStatus('ing');

		let list = [];
		for(let i = 0;i<20;i++){
			list.push(i);
		}
		self.setData({
			dataList:list
		})

		//self.data._gReq = req._reqhandle;
	},

	showSelect:function(e){
		if (this.data.isSelectShow && e.currentTarget.dataset.type==''){
			wx.showTabBar({})
		}else{
			wx.hideTabBar({})
		}
		this.setData({
			isSelectShow:e.currentTarget.dataset.type?true:false
		})
	},

	changeSelectInfo:function(e){
		let array = this.data.selectedInfoArray;
		array[e.currentTarget.dataset.group] = e.currentTarget.dataset.item;
		this.setData({
			selectedInfoArray:array
		})
	},

	viewPersonInfo:function(e){
		wx.navigateTo({
			url: '/pages/index/person/person?pid=' + e.currentTarget.dataset.pid,
		})
	},
	
	clearSelect:function(){
		let array = [0,0,0,0];
		this.setData({
			selectedInfoArray:array
		})
	},

	checkSelect:function(){
		
	}
})