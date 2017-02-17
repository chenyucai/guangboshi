$(window).load(function() {
	$(".inputSm").click(function() {
		$('.search-mask').toggle();
		//		debugger;
		//	  	$(this).toggleClass("mobile-inner-header-icon-click mobile-inner-header-icon-out");
		$.get(constants.baseUrl + "/AppHome/GetSearchValue?Type=" + $("#indexTypeId").val() + "&UserId=" + $.cookie("userId") + "&num=" + "8", function(data, status) {
			var template6 = $('#dajia');
			template6.find("li").remove();
			$('#template6').tmpl(data.AllSearchValueList).appendTo(template6);
			var template7 = $('#zuijinzaisou');
			template7.find("li").remove();
			$('#template6').tmpl(data.MySearchValueList).appendTo(template7);
			//			debugger;
		});
		$(".mobile-inner-nav").slideToggle(350);

	});
	$(".mobile-inner-nav a").each(function(index) {
		$(this).css({
			'animation-delay': (index / 10) + 's'
		});
	});

});

$(".guangdianmeirongClick").live("click", function() {
	//	debugger;
	sessionStorage.setItem("CategoryId", $(this).attr("data-id"));
	sessionStorage.setItem("SubCategoryId", 0);
	sessionStorage.setItem("CategoryName", $(this).attr("data-name"));
	location.href = "CategoryProductList.html";
});

function mingxingchanpingAll() {
	location.href = "starProductList.html";
}

function kuanghuandacuAll() {
	//	alert(",")
	location.href = "promotionProjectList.html";
}

function jingpingzixunAll(){
	location.href="../periodical_office/industryInformation.html"
}

$("#kuanghuandacuDetail").live("click", function() {
	sessionStorage.setItem("ProductId", $(this).attr("data-id"));
	sessionStorage.setItem("ProdcuctType", 2);
	localStorage.setItem('ProdcuctType', 2);
	location.href = "../shaping/productDetails.html";
})

$("#mingxingchanpinDetail").live("click", function() {
	sessionStorage.setItem("ProductId", $(this).attr("data-id"));
	sessionStorage.setItem("ProdcuctType", 1);
	localStorage.setItem('ProdcuctType', 1);
	location.href = "../shaping/productDetails.html";
})

$("#cityStore").live("click", function() {
	sessionStorage.setItem("cityId", $("#cityName").attr("data-id"));
	location.href = "StoreList.html";
})

$("#jingpingzixunDetail").live("click", function() {
	sessionStorage.setItem("NewId", $(this).attr("data-id"));
	location.href = "../periodical_office/photoelectricSchoolDetail.html";
})
