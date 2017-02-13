//$(function() {

$.ajax({
	type: 'post',
	data: {
		code: localStorage.getItem("code")
	},
	//				url: '/Home/GetWxInfo',
	url: constants.baseUrl + '/AppPay/GetWxInfo',
	success: function(sjson) {
		//alert(sjson);

		localStorage.setItem("openid", sjson.openid);
		localStorage.setItem("access_token", sjson.access_token);
		var vData = JSON.stringify(sjson);
		alert(vData);
		//$.messager.show({
		//    title: '提示',
		//    msg: '欢迎您来到微信端充值中心。'
		//});
	},
	error:function(){
		alert('error')
	}
})

//else {
//    $.ajax({
//        type: 'post',
//        url: '/Home/GetCode',
//        success: function (sjson) {
//            //alert(sjson);
//            location.href = sjson;
//        }
//    })
//}
//	})
//获取url的参数
//function getQueryString(name) {
//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//	var r = window.location.search.substr(1).match(reg);
//	if(r != null) return unescape(r[2]);
//	return null;
//}

//初始化微信支付环境
function fCharge() {


	if(typeof WeixinJSBridge == "undefined") {
		if(document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if(document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		fPostCharge();
	}
}
//提交充值数据
function fPostCharge() {


	var vChargeVal = OrderAmount * 100;
	vChargeVal = parseFloat(vChargeVal);
	if(vChargeVal > 0) {
		//$.messager.progress({
		//    title: "",
		//    msg: "正在调用微信支付接口,请稍后..."
		//});
		$.ajax({
			type: "post",
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify({
				amount: vChargeVal,
				//				openid: localStorage.getItem("openid"),
				openid: localStorage.getItem("openid"),
				//				access_token: localStorage.getItem("access_token"),
				userId: $.cookie("userId"),
				orderId: OrderId,
				description: order.CategoryName

			}),
			//data: "amount=" + vChargeVal + "&openid=" + localStorage.getItem("openid") + "&access_token=" + localStorage.getItem("access_token"),
			url: constants.baseUrl + "/AppPay/PrePayByWeixin",
			success: function(json) {
				//$.messager.progress('close');//记得关闭
				//var json = eval("(" + msg + ")");//转换后的JSON对象

				onBridgeReady(json);
			},
			error: function(data1, data2, data3, data4) {

				//$.messager.progress('close');//记得关闭
				//$.messager.alert("提示", '调用微信支付模块失败，请稍后再试。', 'info')
			}
		})
	} else {
		alert("房间名或者充值金额不可以为空或者为负数,请确认后再试.")
	}
}
//调用微信支付模块
function onBridgeReady(json) {

	alert(JSON.stringify(json));
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', {
			"appId": json.appId, //公众号名称，由商户传入
			"timeStamp": json.timeStamp, //时间戳，自1970年以来的秒数
			"nonceStr": json.nonceStr, //随机串
			"package": json.packageValue,
			"signType": "MD5", //微信签名方式:
			"paySign": json.paySign //微信签名
		},
		function(res) {

			alert(JSON.stringify(res));
			if(res.err_msg == "get_brand_wcpay_request:ok") {
				//alert("支付成功,请稍后查询余额,如有疑问,请联系管理员.");
				fBackHome();
			} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
		}
	);
}

function fBackHome() {
	$.post(constants.baseUrl + "/AppPay/PayByWeixinSuccess", {
		userId: $.cookie("userId"),
		orderId: OrderId
	}, function() {
		location.href = "paycompleted.html"
	})

}
