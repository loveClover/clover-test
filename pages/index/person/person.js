// pages/index/person/person.js
const url = "http://p72fmusth.bkt.clouddn.com/image/cws_EUAD21mxSGHW1qnxcGdgpbssjp/2018082119084755_83068526798349227(2).jpg";
Page({

  data: {
		imageList:[],
		url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534861526495&di=d7c96ae5a57d362d3112fe8ebed42f9e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3191315439%2C2254083995%26fm%3D214%26gp%3D0.jpg"
  },

  onLoad: function (options) {
		let imageList = [];
		for(let i = 0;i<10;i++){
			imageList.push(url);
		}
		this.setData({
			imageList: imageList,
			pid: options.pid
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

	showImage:function(e){
		wx.previewImage({
			current: e.currentTarget.dataset.url, // 当前显示图片的http链接
			urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
		})
	}
})