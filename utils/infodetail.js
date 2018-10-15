const city = [];
let	height= [];
for(let i = 130;i<=209;i++){
	height.push(i+'厘米');
}
const	income= [
	'3000元以下',
	'3001-5000元',
	'5001-8000元',
	'8001-12000元',
	'12001-20000元',
	'20001-50000元',
	'50000元以上'
];
const	education= [
	'高中及以上',
	'中专',
	'大专',
	'本科',
	'硕士',
	'博士'
];
const	ismarry= [
	'未婚',
	'离异',
	'丧偶'
];
const	haschild= [
	'没有',
	'有,我们住在一起',
	'有,偶尔一起住',
	'有,但是不在身边'
];
const	wantchild= [
	'想要',
	'不想要',
	'视情况而定'
];
const	work= [
	'计算机/互联网/通信/电子',
	'会计/金融/银行/保险',
	'贸易/消费/制造/营运',
	'制药/医疗',
	'广告/媒体',
	'房地产/建筑',
	'专业服务/教育/培训',
	'服务业',
	'物流/运输',
	'能源/原材料',
	'政府/非营利组织/其他',
	'自由职业',
	'在校学生',
	'其他行业'
];
const	car= [
	'已买车',
	'未买车'
];
const	house= [
	'和家人住',
	'已购房',
	'租房',
	'打算婚后购房'
];

let	weight= [];
for(let i = 40;i<=119;i++){
	weight.push(i+'公斤');
}
const	bodysize= [
	'苗条',
	'运动型',
	'胖乎乎',
	'体态魁梧',
	'壮实'
];
const	smoke= [
	'不吸烟',
	'稍微抽一点',
	'只在社交场合抽',
	'经常抽烟'
];
const	drink= [
		'不喝酒',
		'稍微喝一点',
		'只在社交场合喝酒',
		'经常喝酒'
	];
const	constellation= [
		'白羊座',
		'金牛座',
		'双子座',
		'巨蟹座',
		'狮子座',
		'处女座',
		'天秤座',
		'天蝎座',
		'射手座',
		'摩羯座',
		'水瓶座',
		'双鱼座'
	];
const ethnic= ['汉族', '蒙古族', '满族', '朝鲜族', '赫哲族', '达斡尔族', '鄂温克族', '鄂伦春族', '回族', '东乡族', '土族', '撒拉族', '保安族', '裕固族', '维吾尔族', '哈萨克族', '柯尔克孜族', '锡伯族', '塔吉克族', '乌孜别克族', '俄罗斯族', '塔塔尔族', '藏族', '门巴族', '珞巴族', '羌族', '彝族', '白族', '哈尼族', '傣族', '僳僳族', '佤族', '拉祜族', '纳西族', '景颇族', '布朗族', '阿昌族', '普米族', '怒族', '德昂族', '独龙族', '基诺族', '苗族', '布依族', '侗族', '水族', '仡佬族', '壮族', '瑶族', '仫佬族', '毛南族', '京族', '土家族', '黎族', '畲族', '高山族'];
const	marrytime= [
		'认同闪婚',
		'一年内',
		'两年内',
		'三年内',
		'时机成熟就结婚'
	];
const	showinfo= [
		'对所有用户展示',
		'只对会员展示'
	];
const hasphoto=[
	'有照片',
	'无照片'
	];
let agerange = [['不限'],['不限']];
for (let i = 18; i < 50; i++) {
	agerange[0].push(i);
}
for (let i = 18; i < 100; i++) {
	agerange[1].push(i);
}

let heightrange = [['不限'], ['不限']];
for (let i = 150; i < 200; i++) {
	heightrange[0].push(i);
}
for (let i = 150; i < 200; i++) {
	heightrange[1].push(i);
}

module.exports = {
	city: city, 
	height: height, 
	income: income, 
	education: education, 
	ismarry: ismarry, 
	haschild: haschild, 
	wantchild: wantchild, 
	work: work, 
	car: car, 
	house: house,

	weight: weight, 
	bodysize: bodysize, 
	smoke: smoke, 
	drink: drink, 
	constellation: constellation, 
	ethnic: ethnic, 
	marrytime: marrytime, 
	showinfo: showinfo,
	hasphoto: hasphoto,
	
	agerange: agerange,
	heightrange: heightrange
}

// onchooseImage
// onchooseImage: function () {
// 	let self = this;
// 	wx.chooseImage({
// 		count: 9, // 默认9
// 		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
// 		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
// 		success: function (res) {
// 			// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
// 			var tempFilePaths = res.tempFilePaths;
// 			//获取七牛token
// 			mAppHelper.request({
// 				url: mConfig.APIURL + '/shop/cdnfile/token',
// 				method: 'POST',
// 				data: {
// 				}
// 			}).then((ret) => {
// 				var token = ret.result.token;
// 				tempFilePaths.forEach(value => {
// 					self.qiniuUpload(value, token, 3);
// 				})
// 			})
// 		}
// 	})
// },