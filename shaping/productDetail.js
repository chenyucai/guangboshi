var orderData;

function getUrlParameter(params, paramName){
  var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
  var r = params.substr(1).match(reg);
  if(r!=null) return  unescape(r[2]); return null;
}
var param = window.location.search;
var ProductId = getUrlParameter(param, "id") || sessionStorage.getItem("ProductId");

$.get(constants.baseUrl + "/AppGoods/GetGoodsDetail?Id=" + ProductId + "&UserId=" + $.cookie("userId"), function(data) {
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
  var stores = [];
  data.StoreList.forEach(function(item){
    stores.push(item.Name);
  });
	$("#StoreList").text(stores.join(','));
  if (data.AllStoreList == null) {
    for (var i = 0; i < data.StoreList.length; i++) {
      var c = $(
        '<div class="" style="margin-bottom:5px;">'+
          '<span class="name" style="flex:0 0 20%;">'+data.StoreList[i].Name+':</span>'+
          '<a href="tel:'+data.StoreList[i].TelPhone+'" style="color: #e37cab;text-decoration: underline;">'+data.StoreList[i].TelPhone+'</a>'+
        '</div>'
      );
      c.appendTo(".swp");
    }
  }else {
    for (var i = 0; i < data.AllStoreList.length; i++) {
      var c = $(
        '<div class="" style="margin-bottom:5px;">'+
          '<span class="name" style="flex:0 0 20%;">'+data.AllStoreList[i].Name+':</span>'+
          '<a href="tel:'+data.AllStoreList[i].TelPhone+'" style="color: #e37cab;text-decoration: underline;">'+data.AllStoreList[i].TelPhone+'</a>'+
        '</div>'
      );
      c.appendTo(".swp");
    }
  }

	$("#ImageList").attr("src", data.ImageList[0]);
	$("#imgChose").attr("src", data.ImageList[0]);
	$("#TreatmentChose").text(data.Treatment + "个疗程")
	$("#SellPriceChose").text("¥" + data.SellPrice);
	$("#Content").html(data.Content);
	$("#GroupByRemark").html(data.Remark);
	sessionStorage.setItem("goodsId", data.Id);
	if(data.CollectionMark == true) {
		$(".icon-star").addClass('active');
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
	// alert(JSON.stringify({
	// 		quantity: $("#productNum").val(),
	// 		UserId: $.cookie("userId"),
	// 		goodsId: ProductId || sessionStorage.getItem("ProductId")
	// 	}));
	$.ajax({
		url:constants.baseUrl + "/AppOrderManage/CreateOrder",
		type:'post',
		dataType:'json',
		contentType:'application/json;charset=utf=8',
		data:JSON.stringify({
				quantity: $("#productNum").val(),
				UserId: $.cookie("userId"),
				goodsId: ProductId || sessionStorage.getItem("ProductId")
			}),
		success:function(response){
      debugger;
			if(response.Status != 1) {
				// alert(response);
				return false;
			}
			sessionStorage.setItem("OrderAmount", response.OrderAmount);
			sessionStorage.setItem("OrderID", response.ID);
			sessionStorage.setItem("quantity", $("#productNum").val());
			location.href = "affirmOrder.html";
		},
		error:function(data){
			alert(JSON.stringify(data))
		}
	})
	// $.post(constants.baseUrl + "/AppOrderManage/CreateOrder", {
	// 		quantity: $("#productNum").val(),
	// 		UserId: $.cookie("userId"),
	// 		goodsId: ProductId || sessionStorage.getItem("ProductId")
	// 	},
	// 	function(response) {
	// 		if(response.Status != 1) {
	// 			// alert(response);
	// 			return false;
	// 		}
	// 		sessionStorage.setItem("OrderAmount", response.OrderAmount);
	// 		sessionStorage.setItem("OrderID", response.ID);
	// 		sessionStorage.setItem("quantity", $("#productNum").val());
	// 		location.href = "affirmOrder.html";
	// 	})

})

// $("#startClick").live("click", function () {
//     if (!checkLogin("../shaping/productDetails.html?id="+ProductId)) {
//         return;
//     }
// 	var SetClearMark = 1;
// 	if($(this).find("i").css("color") == "rgb(240, 59, 146)") {
// 		SetClearMark = 2;
// 	}
// 	$.post(constants.baseUrl + "/AppCommon/SetClearCollectionZan", {
// 			SetClearMark: SetClearMark,
// 			UserId: $.cookie("userId"),
// 			Id: sessionStorage.getItem("ProductId"),
// 			Category: 2,
// 			Type: 1,
// 			Title: $("#Title").text()
//
// 		},
// 		function(response) {
// 			if(response != "") {
// 				alert(response);
// 			}else {
// 			  window.location.reload();
// 			}
// 		})
// })

$("#startClick").live("click", function () {
  if (!checkLogin("../shaping/productDetails.html?id="+ProductId)) {
      return;
  }
  var SetClearMark = 1;
  if($(".icon-star").hasClass('active')) {
    SetClearMark = 2;
  }
  $.post(constants.baseUrl + "/AppCommon/SetClearCollectionZan", {
      SetClearMark: SetClearMark,
      UserId: $.cookie("userId"),
      Id: sessionStorage.getItem("ProductId"),
      Category: 2,
			Type: 1
    },
    function(response) {
      if(response != "") {
        alert("系统错误");
      }else{
        if ($(".icon-star").hasClass('active')) {
          $(".icon-star").removeClass('active');
        }else {
          $(".icon-star").addClass('active');
        }
      }
    })
})

$("#GetCoupon").live("click", function() {
	if (!checkLogin("../shaping/productDetails.html?id="+ProductId)) {
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

$("#appointment").live("click",function(){
  $("#goodcover").show();
  $(".code_box").show();
})
