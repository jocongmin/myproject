$(document).ready(function(){
	$(window).scroll(function() {
		var slTop = $(window).scrollTop();
		if(slTop > 0){
			$(".documentToTop").show();
		}else{
			$(".documentToTop").hide();
		}
	});
	/**
	$("#classification").hover(
			function(){
				$(this).children(".classList").addClass("hover");
			},
			function(){
				$(this).children(".classList").removeClass("hover");
			}
	 );
	$("#classification .attrName").hover(
			function(){
				
				var tp2 = $(this).offset().top-1;
				var tp = $("#classification").offset().top+38;
				var scr = $(window).scrollTop() - tp;
				var scr2 = tp2 - tp;
				$(this).children(".attrListzd").css({top:scr2+"px"});
				$(this).addClass("attrNameHover");
				if(scr > 0){
					$("#classification .attrList").css({top:scr+"px"});
				}else{
					$("#classification .attrList").css({top:"-2px"});
				}
				$(this).children(".attrListzd").show();
			},
			function(){
				$(this).removeClass("attrNameHover");
				$(this).children(".attrListzd").hide();
			}
	 );
	 **/
});

function goTop(acceleration, time) {
	acceleration = acceleration || 0.1;
	time = time || 16;
 
	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var x3 = 0;
	var y3 = 0;
 
	if (document.documentElement) {
		x1 = document.documentElement.scrollLeft || 0;
		y1 = document.documentElement.scrollTop || 0;
	}
	if (document.body) {
		x2 = document.body.scrollLeft || 0;
		y2 = document.body.scrollTop || 0;
	}
	var x3 = window.scrollX || 0;
	var y3 = window.scrollY || 0;
 
	// 滚动条到页面顶部的水平距离
	var x = Math.max(x1, Math.max(x2, x3));
	// 滚动条到页面顶部的垂直距离
	var y = Math.max(y1, Math.max(y2, y3));
 
	// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
	var speed = 1 + acceleration;
	window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
 
	// 如果距离不为零, 继续调用迭代本函数
	if(x > 0 || y > 0) {
		var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
		window.setTimeout(invokeFunction, time);
	}
}