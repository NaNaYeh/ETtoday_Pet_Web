/* common.js===============================*/

var isMobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/BlackBerry/);
console.log("navigator.userAgent:"+navigator.userAgent);

//text_ticker_1
$(function(){
		
	//無內容 隱藏
	if($(".text_ticker_1 .run .inner a").length === 0){
		$(".text_ticker_1").hide();
	}

	//1則以上才輪播
	if($(".text_ticker_1 .run .inner a").length > 1){ //1則以上才輪播
			$(".text_ticker_1 .run .inner").bxSlider({  
			mode:"fade",
			slideWidth: 300,
			speed:500,
			pager: false,
			controls:false,
			touchEnabled: true,
			adaptiveHeight:true,
			auto: true,
			autoHover:true,
			onSliderLoad:function(){
				$(".text_ticker_1 .run .inner a").show();
			}
		});
	}
});

//gallery_1 index.htm-大圖Banner
$(function(){
	$(".gallery_1 .run .inner").bxSlider({
		slideWidth: 1920,
		slideMargin: 0,
		minSlides: 1,
		maxSlides: 1,
		speed:1000,
		pager: true,
		touchEnabled: true,
		adaptiveHeight:true,
		auto: true,
		onSliderLoad : function(){
			$(".gallery_1 .run .inner .piece img").show();
		}
	});
});

/*gallery_3 手機m輪播*/
$(function(){
	var propAuto = $('.gallery_3').hasClass('prop_auto');
	$('.gallery_3 .run').bxSlider({
		slideWidth: 640,
		slideMargin: 0,
		minSlides: 1,
		maxSlides: 1,
		pager: true,
		touchEnabled: true,
		adaptiveHeight:true,
		auto: propAuto,
		onSliderLoad: function(){
			$('.gallery_3 img').css({display:"block"});
		}
	});
});

/*gallery_2 + jqzoom 外掛*/
$(function(){

	var afterGalleryLoad = function(){
		$('.gallery_2 .run img').css({display: "block"});
		//點圖片
		$(".gallery_2 .piece img").click(function(e){
			e.preventDefault();
			var $img = $('<img style="opacity:.7;" src="'+ $(this).data("m") +'" width="400" height="400" jqimg="'+ $(this).data("l") +'"/>');
			$(".show_pic").html($img);
	
			setTimeout(function(){
				$img.css({opacity:1});
			},50);
		});
	
		$(".jqzoom").jqueryzoom({
			xzoom: 300,
			yzoom: 300,
			offset: 10, 
			position: "right",
			preload:1,
			lens:1
		});
	};
	
	$(function(){
		$('.gallery_2 .run').bxSlider({
			slideWidth:70,
			slideMargin: 17,
			minSlides:1,
			maxSlides:4,
			pager:false,
			onSliderLoad: function(){
				setTimeout(afterGalleryLoad, 500);
			}
		});
	});

});




//side側欄滑出選單
$(function(){

	var bMenuStatus = 0; //開關狀態
	var $html = $('html');
	var $body = $('body');
	var $side = $('.side');
	
	//fn選單開
	function fnMenuOpen(){
		bMenuStatus = 1;
		$html.css({'overflow-y':'hidden'});/*維持一個捲軸，目前捲軸在.side*/
		$body.css({'overscroll-behavior':'contain'});/*阻止Android滾動刷新*/
		$side.addClass("active");
	}
	
	//fn選單關
	function fnMenuClose(){
		bMenuStatus = 0;
		$html.css({'overflow-y':'visible'});
		$side.removeClass("active");	
	}
	
	//按鈕 選單開
	$('.header .btn_open').on('click', fnMenuOpen);
	
	//按鈕 選單關
	$('.side .btn_close, .side .nav_2 .sub a').on('click', function(){
		if( bMenuStatus === 1){fnMenuClose();}
	});

});

//location.hash 網址有#加上class
$(function(){
	var iNoHash = window.location.hash;
	if(iNoHash){
		$(".block_1").addClass("scroll-top");
	}
	//console.log(iNoHash);
});


//light_box_1
$(function(){

	//顯示Baaner
	function showBaaner(){
		$(".light_box_1").addClass("active");
		if($(".light_box_1").hasClass("active")){
			$("body").addClass("noscroll");
		}
	}

	$(".light_box_1 .btn_close").click(function(){
			$('body').removeClass("noscroll");
			$(".light_box_1").fadeOut();
			$(".light_box_1").removeClass("active");
		});

	
	if( !$.cookie("t1") ){ showBaaner() };
	$.cookie("t1", "aa", {expires:1});

});


//m_serch_box 手機搜尋
$(function(){
	var $gsbox = $(".header .m_search_box .gsbox .keyword");
	var $iconClose = $(".header .m_search_box .icon_close");
	var $iconOpen = $(".header .m_search_box .icon_open");

	//初始隱藏
	$gsbox.hide();
	$iconClose.hide();

	$iconOpen.on("click", function(){
		$iconClose.show();
		$(this).hide();
		$(".header .main_logo").css({"opacity":"0.3"});
		$gsbox.val('').show().animate({"width":"220px","padding-left":"10px"},300).focus();
		$(".header .m_search_box").css({"width":"300px"});
	});

	$iconClose.on("click", function(){
		$iconOpen.show();
		$(this).hide();
		$(".header .main_logo").css({"opacity":"1"});
		$gsbox.animate({"width":"0px","padding-left":"0px"},300).hide();
	});

});





//拷貝連結
$(function(){
	$(".copy-link").click(function(){
		var $temp = $("<input>"); //暫放網址用
		alert("已複製連結網址")
		$("body").append($temp);
		$temp.val(window.location.href).select();
		document.execCommand("copy");
		$temp.remove(); //移除
	});
});

//修正 新聞內文 段落 圖說 margin =================
$(function(){
	$(".subject_article .story p strong").each(function (){
	
		var $strong = $(this);
		var $p = $strong.parent("p");
		var sTxt = $strong.text();
	
		switch (true) {  
	
			//strong 圖說在中間
			case Boolean(sTxt.match(/^▲▼/g)): //正規式 match 輸出陣列需要轉布林 
				$p.prev("p").addClass("no_margin");
				$p.addClass("no_margin");
				break;
	
			//strong 圖說在下
			case Boolean(sTxt.match(/^▲/g)): 
				$p.prev("p").addClass("no_margin");
				break;
	
			//strong 圖說在上
			case Boolean(sTxt.match(/^▼/g)): 
				$p.addClass("no_margin");
				break;
	
			default:
				// console.log("圖說無動作");
		}
	
		//strong 圖說加樣式
		if (sTxt.match(/▼|▲/g)) {
			$strong.addClass("figcaption");
		}
		
	});
});


//文中廣告，若有內容，顯示"請繼續往下閱讀"的文字 & 優化圖說與文中廣告的位置(if廣告插在圖片&圖說中間，移動圖片)
$(function(){
	setTimeout(function(){ 
		$('.ad_in_news').each(function () {
			if ( $(this).find("ins").length || $(this).find("img").length || $(this).find("iframe").length) { //ins:google聯播網，img:其他聯播網
				$(this).find(".ad_readmore").css({"display":"block"});


				//圖說優化 開始============
				switch (true) { 

					//廣告後有：圖說+圖片
					case Boolean( $(this).next('p').find('strong').text().match(/^▲▼/g)):
						$(this).prev("p").addClass("no_margin");
						$(this).next('p').insertBefore($(this));//圖說往上搬
						$(this).next('p').insertBefore($(this));//圖片往上搬
						break;

					//廣告後有：圖片
					case Boolean($(this).prev('p').find('strong').text().match(/^▲▼/g)): 
						$(this).next('p').insertBefore($(this));//圖片往上搬
						break;

					//廣告後有：圖說
					case Boolean($(this).next('p').find('strong').text().match(/^▲(?!▼)/g)):
						$(this).prev("p").addClass("no_margin");
						$(this).next('p').insertBefore($(this));//圖說往上搬
						break;

					default:
						break;
				}
				//圖說優化 結束============

			}	
		});	
	}, 2000);
});	



// gototop 模組======================================
$(function(){
	var $goToTop = $(".gototop");
	var iScrollPointA = 0;  //滾回的位置
	var iScrollPointB = 50; //滾到的位置 出現gototop

	//滾動事件
	var oScrollTimer = null;
	$(window).on("scroll", function(){
		if(oScrollTimer){
			clearTimeout(oScrollTimer);
		}
		oScrollTimer = setTimeout(function(){
			if( $(window).scrollTop() > iScrollPointB) {
				$goToTop.show();
			} else {
				$goToTop.hide();
			}
		}, 50);
	});

	// 讓捲軸用動畫的方式移動到到指定id位罝
	$goToTop.on("click", function(){
		var $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //修正 Opera 問題
		$body.animate({scrollTop: iScrollPointA}, 50);
		return false;
	});
});




