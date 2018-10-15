// pages/message/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		id:'',
		detail:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options);
		this.setData({
			id:options.id
		})
		this.getDetail(options.id)
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

	getDetail:function(id){
		let list = [];
		for (let i = 0; i < 15; i++) {
			list.push({ url: 'http://p72fmusth.bkt.clouddn.com/timg'+(i%4+1)+'.jpg', id: i })
		}
		this.setData({
			detail: { image: 'http://p72fmusth.bkt.clouddn.com/timg4.jpg', title: '标题', address: '中国 北京 北京', time: '2018-08-08', desc: '  春天的风，清明的雨，唤醒了大地的姹紫嫣红、绿满大地，也催生了房前屋后的几朵嫩芽。\n  吃完晚饭站在收费站院子门口，偶遇外出归来的同事，看着她手心露出紫红色嫩芽，心中不由一喜忙上前问道，是不是附近村子里的香椿树发芽了，得到她肯定的答复后，我的思绪被拉长，恍惚之间想起了老家南墙根的那香椿树来。', imageList: list}
		})
	},

	viewImage:function(e){
		wx.previewImage({
			current: e.currentTarget.dataset.url, // 当前显示图片的http链接
			urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
		})
	},

	editActivity:function(){
		wx.navigateTo({
			url: '/pages/message/edit/edit?id=' + this.data.id,
		})
	}
})