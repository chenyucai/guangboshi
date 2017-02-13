Date.prototype.Format = function(fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function checkLogin(url)
{
	var userId = $.cookie('userId');
	if(userId == undefined || userId == null || userId == "")
	{
		url = url || "index.html";
		localStorage.setItem('url',url);
		location.href = "../home/Login.html";
		return false;
	}
	return true;
}

var constants = {
	//baseUrl: "http://192.168.1.108:12222"
	//  baseUrl: "alpha.hy-bit.com"
	// baseUrl: "http://localhost:8080"
	//  baseUrl: "http://localhost:8080"
		//baseUrl:"http://192.168.1.112:8111"
		//baseUrl: "http://114.215.99.142:8089"
		//baseUrl:"http://192.168.1.108/GBS.Cms/"
		baseUrl:"http://www.missnefer.com"
};
window.cityLocation = new Location();
window.getNameById = function(id) {

	var ids = id.split(" - ");
	var province = "";
	var city = "";
	var area = "";
	province = cityLocation.items["0"][ids[0]];

	var cityList = cityLocation.find("0," + ids[0]);
	var cityLength = 0;
	$.each(cityList, function(keyCity, valueCity) {
		cityLength++;
	});
	if(cityLength > 1) {
		city = cityLocation.items["0," + ids[0]][ids[1]];
	}

	area = cityLocation.items["0," + ids[0] + "," + ids[1]][ids[2]];
	if(area == undefined) {
		area = "";
	}
	return province + city + area;
};

window.myTools = {
	"getTargets": function(option, res) {
		debugger; // 第一个参数为查询条件，第二个参数是目标数组
		var values;
		var keys;
		var gets = [];
		for(var key in option) {
			keys = key;
			values = option[key];
		}
		res.map(function(ele, i) {
			if(ele[keys] == values) {
				gets.push(ele);
			}
		});
		return gets;
	}
};
