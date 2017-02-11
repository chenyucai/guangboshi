$(function() {

	

	$("#orderDetail").click(function() {
		sessionStorage.setItem("orderId", OrderId);
		location.href = "../beautifulLibrary/orderDetail.html";
	})

	$('.categoryListDl dt').click(function() {
		$(this).siblings('dd').slideToggle();
		$(this).parent('.categoryListDl').siblings('').find('dd').slideUp(400);
	});

	$('.navOpen').click(function() {
		$('.layoutMain').toggleClass('sideTransform');
	});
	$('.mask').click(function() {
		$('.layoutMain').removeClass('sideTransform');
	});

	$('.sideNavLi>a').click(function() {
		$(this).parent('').toggleClass('cut');
		$(this).parent('').find('ul').slideToggle(400);
		$(this).parent('').siblings('').find('ul').slideUp(400);
		$(this).parent('').siblings('').removeClass('cut');
	});

	$('.screeningTitle').click(function() {
		$(this).siblings('.screeningDd').slideToggle(400);
		$(this).parent('.screeningList').siblings('').find('.screeningDd').slideUp(400);
		$(this).toggleClass('active');
		$(this).parent('.screeningList').siblings('').find('.screeningTitle').removeClass('active');
	});
	$('.screeningDd a').click(function() {
		var screeningVar = $(this).text();
		$(this).addClass('active');
		$(this).siblings('').removeClass('active')
		$(this).parent('.screeningDd').siblings('.screeningTitle').find('span b').text(screeningVar);
		$(this).parent('.screeningDd').slideUp(400);
	});

	$('#abbrBtn').click(function() {
		$('.abbrWindow').slideToggle(400);
	});
	$('.abbrWindowClose').click(function() {
		$('.abbrWindow').slideUp(400);
	});

	$('.shareBtn').click(function() {
		$('.shareWindow').slideToggle(400);
	});

	$('.shareBtn').click(function() {
		$('.shareWindow').slideDown(400);
	});

	$('.shareWindowClose').click(function() {
		$('.shareWindow').slideUp(400);
	});

	var windowH = $('.windowBox').height() / 2,
		windowW = $('.windowBox').width() / 2;
	$('.windowBox').css({
		'marginTop': -windowH,
		'marginLeft': -windowW
	});

	$('.consigneeListAdd,.editMonsignee').click(function() {
		$('.consigneeWindow').slideDown(400);
	});

	$('.consigneeSubmit,.consigneeQuxiao').click(function() {
		$('.consigneeWindow').slideUp(400);
	});

	$('.btnFapiao').click(function() {
		$('.orderFapiao').slideDown(400);
	});

	$('.activityBlockClose').click(function() {
		$('.activityBlock').slideUp(400);
	});

	$('.orderFapiaoSubmit,.orderFapiaoClose').click(function() {
		$('.orderFapiao').slideUp(400);
	});
	$('.sellerListBtn').click(function() {
		$('.sellerWindow').slideDown(400);
	});
	$('.sellerWindowClose,.sellerWindowSubmit').click(function() {
		$('.sellerWindow').slideUp(400);
	});

	$('.artistBtn').click(function() {
		$('.artistWindow').slideDown(400);
	});
	$('.artistClose,.artistSubmit').click(function() {
		$('.artistWindow').slideUp(400);
	});

	$('.picWindowClose').click(function() {
		$('.picWindow').slideUp(400);
	});
	$('.viewHead').click(function() {
		$('.picWindow').slideDown(400);
	});

	$('.openXy').click(function() {
		$('.xyWindow').slideDown(400);
	});

	$('.xyWindowClose').click(function() {
		$('.xyWindow').slideUp(400);
	});

});

$(function() {
	var cubuk_seviye = $('.pageMain').scrollTop();
	var header_yuksekligi = $('.pageFoot,.pageHead,.screening').outerHeight();
	$('.pageMain').scroll(function() {
		//alert(111)
		var kaydirma_cubugu = $('.pageMain').scrollTop();

		if(kaydirma_cubugu > header_yuksekligi) {
			$('.pageFoot,.pageHead,.screening').addClass('gizle');
		} else {
			$('.pageFoot,.pageHead,.screening').removeClass('gizle');
		}

		if(kaydirma_cubugu > cubuk_seviye) {
			$('.pageFoot,.pageHead,.screening').removeClass('sabit');
		} else {
			$('.pageFoot,.pageHead,.screening').addClass('sabit');
		}

		cubuk_seviye = $('.pageMain').scrollTop();
	});
});

$(function() {

	/*$('.pageMain').scroll(function() {
		var newsScroll = $('.pageMain').scrollTop()-50;
		var newsList = $('.newsList li');
		var newsListZ = $('.newsList li').offset().top;
		//alert(newsListZ)
		$('.newsList li .h3').text($('.newsList li').offset().top);
		$('.box').text(newsScroll);
		
		if (newsScroll > newsList){
			$(newsList).addClass('active');
		} 
        else {}
     });*/
	$('.pageMain').scroll(function() {
		var sTop = $(window).scrollTop();
		$('.newsList li').each(function() {
			var liTop = $(this).offset().top;
			if(sTop >= liTop) {
				$(this).addClass('active');
				$(this).parent().removeClass('active');
			} else {
				$(this).removeClass('active');
			}
		})
	})
});