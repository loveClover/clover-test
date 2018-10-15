// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.getList()
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

	getList:function(){
		let list = [];
		for(let i=0;i<15;i++){
			list.push({ image: 'http://p72fmusth.bkt.clouddn.com/timg4.jpg', title: '标题标题标题标题标题标题标题标题标题标题标题标题', address:'中国 北京 北京',time:'2018-08-08',id:i})
		}
		this.setData({
			dataList:list
		})
	},

	goDetail:function(e){
		wx.navigateTo({
			url: '/pages/message/detail/detail?id='+e.currentTarget.dataset.id,
		})
	},

	addActivity:function(e){
		wx.navigateTo({
			url: '/pages/message/edit/edit?id=0',
		})
	}

})