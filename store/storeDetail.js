//debugger;
$(document).ready(function() {
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 18);
	map.enableScrollWheelZoom(true);
	//	map.setZoom(map.getZoom() + );
	$.get(constants.baseUrl + "/AppStore/GetStoreDetail?storeId=" + sessionStorage.getItem("storeId") + "&UserId=" + $.cookie("userId"), function(response) {
		debugger;
//		$("#Treatment").text(response.Store.Name.substr(10));
$("#Treatment").text(response.Store.Name);
		$("#Abstract").text(response.Store.Abstract);
		$("#Reservation").text(response.Store.Reservation);
		$("#Price").text(response.Store.Price);
		$("#Telephone").attr("href","tel://" + response.Store.Telephone);
		var template = $("#GoodsCategory");
		$("#template").tmpl(response.GoodsCategory).appendTo(template);

		var template1 = $("#bbb .swiper-wrapper");
		$("#template1").tmpl(response.Store).appendTo(template1);

		var template2 = $("#aaa .swiper-wrapper");
		$("#template2").tmpl(response.GoodsCategory).appendTo(template2);

		var template3 = $("#kuanghuandacu ul");
		$("#template3").tmpl(response.DiscountedGoods).appendTo(template3);

		var template4 = $(".viewComment");
		$("#template4").tmpl(response.Evaluation).appendTo(template4);
		if(response.Store.CollectionMark == true) {
			$(".icon-star").css("color", "#F03B92");
		}
		// 用经纬度设置地图中心点

		if(response.Store.Longitude != null) {
			//			debugger;
			map.clearOverlays();
			var new_point = new BMap.Point(response.Store.Longitude, response.Store.Latitude);
			var marker = new BMap.Marker(new_point); // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中
			map.panTo(new_point);
		}

		var mySwiper = new Swiper('#bbb', {
			calculateHeight: true,
			pagination: '.pagination',
			paginationClickable: true,
			//speed:950,
			loop: true,
			slidesPerView: 1
		});

		$(function() {
			var tabsSwiper = new Swiper('#aaa', {
				speed: 500,
				onSlideChangeStart: function() {

					$(".sellerTab .active").removeClass('active')
					$(".sellerTab li").eq(tabsSwiper.activeIndex).addClass('active')
				},
				calculateHeight: true
			})
			$(".sellerTab li").on('touchstart mousedown', function(e) {
				//				debugger;
				e.preventDefault()
					//				r.p={}
					//				s.l = r;
				$(" .sellerTab .active").removeClass('active')
				$(this).addClass('active')
				tabsSwiper.swipeTo($(this).index())
			})
			$(" .sellerTab li").click(function(e) {
				e.preventDefault()
			})
		});

	})
})

$("#craftsmanDetail").live("click", function() {
	sessionStorage.setItem("beauticianId", $(this).attr("data-id"));

	//		var searchData = window.myTools["getTargets"]($(this).attr("data-id"), dataDetail);
	location.href = "craftsmanDetail.html";
})

$("#kuanghuandacuDetail").live("click", function() {
	sessionStorage.setItem("ProductId", $(this).attr("data-id"));
	sessionStorage.setItem("ProdcuctType", 2);
	location.href = "../shaping/productDetails.html";
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

$("#startClick").live("click", function() {
	debugger;
	var SetClearMark = 1;
	if($(this).find("i").css("color") == "rgb(240, 59, 146)") {
		SetClearMark = 2;
	}
	$.post(constants.baseUrl + "/AppCommon/SetClearCollectionZan", {
			SetClearMark: SetClearMark,
			UserId: $.cookie("userId"),
			Id: sessionStorage.getItem("storeId"),
			Category: 1,
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


$("#GetMessage").live("click", function () {
    if (!checkLogin()) {
        return;
    }
	sessionStorage.setItem("messageType", 2);//普通产品
	location.href ="../shaping/onlineMessage.html"
})