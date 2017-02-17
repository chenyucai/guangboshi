var orderData;

$.get(constants.baseUrl + "/AppGoods/GetGoodsDetail?Id=" + sessionStorage.getItem("ProductId") + "&UserId=" + $.cookie("userId"), function(data) {
	// if(sessionStorage.getItem("ProdcuctType") == 2) {
	if (localStorage.getItem('ProdcuctType') == 2) {
		$("#general").hide();
		$(".specialPerformance").show();
		var interval = 1000;
		var time = data.EndTime.split('.');
		console.log(time);

		window.setInterval(function() {
			ShowCountDown(time[0], time[1], time[2], 'countDown');
		}, interval);
	}
	orderData = data;
	$("#AllAverage").text(data.AllAverage==null?0:data.AllAverage);

	for(var i = 0; i < data.ServiceAverage; i++) {
		//		$("#ServiceAverage i")[i].removeClass("icon-star").addClass("icon-star-full");
		$("#ServiceAverage").find("i:eq("+ i+ ")").attr("class", "icon-star-full");
	}

	for(var i = 0; i < data.SYPFAverage; i++) {
		//		$("#SYPFAverage i")[i].removeClass("icon-star").addClass("icon-star-full");
		$("#SYPFAverage").find("i:eq("+ i+ ")").attr("class", "icon-star-full");
	}

	$("#SellCount").text("已售" + data.SellCount);
	$("#Title").text(data.Title);
	$("#CategoryName").text("【 " + data.CategoryName + "】");
	$("#CategoryNameChose").text("【 " + data.CategoryName + "】");
	$("#Treatment").text(data.Treatment + "个疗程")
	$("#SellPrice").text(data.SellPrice);
	$("#MarketPrice").text(data.MarketPrice);
	$("#StoreList").text(data.StoreList.join(','));
	$("#ImageList").attr("src", data.ImageList[0]);
	$("#imgChose").attr("src", data.ImageList[0]);
	$("#TreatmentChose").text(data.Treatment + "个疗程")
	$("#SellPriceChose").text("¥" + data.SellPrice);
	$("#Content").html(data.Content);
	$("#GroupByRemark").html(data.Remark);
	sessionStorage.setItem("goodsId", data.Id);
	if(data.CollectionMark == true) {
		$(".icon-star").css("color", "#F03B92");
	}
	$("#CollectionUserNum").text(data.CollectionUserNum);

	var template = $('#CollectionUserList');
	$('#template').tmpl(data.CollectionUserList).appendTo(template);
	var template1 = $("#comment");
	$("#template1").tmpl(data.AssessmentsList).appendTo(template1);

	var tabsSwiper = new Swiper('.swiper-container', {
		speed: 500,
		onSlideChangeStart: function() {
			$(".sellerTab .active").removeClass('active')
			$(".sellerTab li").eq(tabsSwiper.activeIndex).addClass('active')
		},
		calculateHeight: true
	})
	$(".sellerTab li").on('touchstart mousedown', function(e) {
		e.preventDefault()
			//				r.p={}
			//				s.l = r;
		$(".sellerTab .active").removeClass('active')
		$(this).addClass('active')
		tabsSwiper.swipeTo($(this).index())
	})
	$(".sellerTab li").click(function(e) {
		e.preventDefault()
	})

})
$("#checkComplete").live("click", function () {
    if (!checkLogin()) {
        return;
    }
	//	orderData.productNum = $("#productNum").val();
	//	sessionStorage.setItem("orderData", orderData);
	var DataString = JSON.stringify(orderData);
	sessionStorage.setItem("orderData", DataString);

	$.post(constants.baseUrl + "/AppOrderManage/CreateOrder", {
			quantity: $("#productNum").val(),
			UserId: $.cookie("userId"),
			goodsId: sessionStorage.getItem("ProductId")
		},
		function(response) {
			if(response.Status != 1) {
				alert(response);
				return false;
			}
			sessionStorage.setItem("OrderAmount", response.OrderAmount);
			sessionStorage.setItem("OrderID", response.ID);
			sessionStorage.setItem("quantity", $("#productNum").val());
			location.href = "affirmOrder.html";
		})

})

$("#startClick").live("click", function () {
    if (!checkLogin('../shaping/productDetails.html')) {
        return;
    }
	var SetClearMark = 1;
	if($(this).find("i").css("color") == "rgb(240, 59, 146)") {
		SetClearMark = 2;
	}
	$.post(constants.baseUrl + "/AppCommon/SetClearCollectionZan", {
			SetClearMark: SetClearMark,
			UserId: $.cookie("userId"),
			Id: sessionStorage.getItem("ProductId"),
			Category: 2,
			Type: 1,
			Title: $("#Title").text()

		},
		function(response) {
			if(response != "") {
				alert("系统错误");
			}
			window.location.reload();
		})
})

$("#GetCoupon").live("click", function() {
	if (!checkLogin('../shaping/CouponList.html')) {
			return;
	}else {
		location.href = "CouponList.html";
	}

})

function ShowCountDown(year, month, day, divname) {

	var now = new Date();
	//var endDate = new Date(time.replace(/-/g,"/"));

	//var endDate=new Date(time);
	var endDate = new Date(year, month - 1, day);
	var leftTime = endDate.getTime() - now.getTime();
	var leftsecond = parseInt(leftTime / 1000);
	//var day1=parseInt(leftsecond/(24*60*60*6));
	var day1 = Math.floor(leftsecond / (60 * 60 * 24));
	var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
	var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
	var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
	var cc = document.getElementById(divname);
	//alert(time);
	//alert(time.replace(/-/g,"/"));
	//alert(endDate);
	cc.innerHTML = day1 + "天" + hour + "小时" + minute + "分" + second + "秒";
}

$(".suggestedClick").live("click", function() {

	location.href = "userSuggested.html"
})

$(".mt10").live("click", function() {

	$.post(constants.baseUrl + "/AppCommon/Share", {
		Id: $(this).attr("data-id"),
		UserId: $.cookie("userId"),
		Type: 2
	}, function(response) {

		$('.shareWindow').slideUp(400);
	})
})
$("#GetMessage").live("click", function() {
	if (!checkLogin('../shaping/onlineMessage.html')) {
			return;
	}
	sessionStorage.setItem("messageType", 1); //普通产品
	location.href = "onlineMessage.html";
})
