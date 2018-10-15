// pages/message/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		activityInfo: {
			title: '', desc: '',city: ['', '', ''], address: '',date:'',time:'',imageList:[]
		},
		imageList:[],
		id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu({})
		if(options.id){
			this.setData({
				id: options.id
			})
		}
		if (options.id){
			this.getDetail()
		};
		let list = [];
		for (let i = 0; i < 15; i++) {
			list.push({ url: 'http://p72fmusth.bkt.clouddn.com/timg' + (i % 4 + 1) + '.jpg', id: i })
		}
		this.setData({
			imageList:list
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

	getDetail:function(){

	},

	bindPickerThreeChange: function (e) {
		let type = e.currentTarget.dataset.type,
			array = e.detail.value,
			activityInfo = this.data.activityInfo;
		activityInfo[type] = array;
		this.setData({
			activityInfo: activityInfo
		})
	},
	bindDateChange: function (e) {
		let activityInfo = this.data.activityInfo;
		activityInfo.date = e.detail.value
		this.setData({
			activityInfo: activityInfo
		})
	},
	bindTimeChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		let activityInfo = this.data.activityInfo;
		activityInfo.time = e.detail.value
		this.setData({
			activityInfo: activityInfo
		})
	},
	uploadImage:function(){
		let self = this;
		let list = this.data.imageList;
		wx.chooseImage({
			count: 9, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				res.tempFilePaths.forEach(value=>{
					list.push({url:value,id:list.length})
				});
				console.log(list);
				self.setData({ imageList:list})
			}
		})
	},
	deleteImage:function(e){
		let list = this.data.imageList;
		list.splice(e.currentTarget.dataset.id, 1);
		this.setData({
			imageList: list
		})
	},
	viewImage:function(e){
		wx.previewImage({
			current: e.currentTarget.dataset.url,
			urls: [e.currentTarget.dataset.url]
		})
	},
	moveImage:function(e){
		let list = this.data.imageList;
		let obj = {};
		if (e.currentTarget.dataset.type=='pre'){
			obj = list[e.currentTarget.dataset.id];
			list[e.currentTarget.dataset.id] = list[e.currentTarget.dataset.id-1];
			list[e.currentTarget.dataset.id-1] = obj
		}else{
			obj = list[e.currentTarget.dataset.id];
			list[e.currentTarget.dataset.id] = list[e.currentTarget.dataset.id + 1];
			list[e.currentTarget.dataset.id+1] = obj
		}
		this.setData({ imageList:list})
	},

	onGotUserInfo: function (e) {
		console.log(e);
		console.log(e.detail.errMsg)
		console.log(e.detail.userInfo)
		console.log(e.detail.rawData)
	},
})