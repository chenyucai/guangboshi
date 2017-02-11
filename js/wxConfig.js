var data;
$.get(constants.baseUrl + "/AppCommon/GetWeixinConfig?userId=" + $.cookie("userId"), function(config) {
	data = config;
	debugger;
})

wx.config({
	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。    
	appId: data.AppId, // 必填，公众号的唯一标识    
	timestamp: data.Timestamp, // 必填，生成签名的时间戳    
	nonceStr: data.NonceStr, // 必填，生成签名的随机串    
	signature: data.Signature, // 必填，签名，见附录1    
	jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage'
		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function() {
	<%--公共方法--%>
	var shareData = {
		title: '${title}',
		desc: '${description}',
		link: '${url}',
		imgUrl: '${headImgUrl}',
		success: function(res) {
			//alert('已分享');    
		},
		cancel: function(res) {}
	};
	<%--分享给朋友接口--%>
	wx.onMenuShareAppMessage({
		title: '${title}',
		desc: '${description}',
		link: '${url}',
		imgUrl: '${headImgUrl}',
		trigger: function(res) {
			//  alert('用户点击发送给朋友');    
		},
		success: function(res) {
			//alert('已分享');    
		},
		cancel: function(res) {
			//alert('已取消');    
		},
		fail: function(res) {
			alert(JSON.stringify(res));
		}
	});
	<%--分享到朋友圈接口--%>
	wx.onMenuShareTimeline({
		title: '', // 分享标题    
		link: '', // 分享链接    
		imgUrl: '', // 分享图标    
		success: function() {
			// 用户确认分享后执行的回调函数    
		},
		cancel: function() {
			// 用户取消分享后执行的回调函数    
		}
	});
});
<%--处理失败验证--%>
wx.error(function(res) {
	alert("error: " + res.errMsg);
});