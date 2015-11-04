function initChecked(){
	var checked= document.querySelectorAll('.js-switch');
	for (var i = 0; i < checked.length; i++) {
	  var switchery = new Switchery(checked[i]);
	}
}
initChecked();
$(".header .expand").click(function(){
	var isexpand=$(this).find("span").data("type");
	if(isexpand!=undefined){
		switch(isexpand){
			case "paixu":
			$("#"+isexpand).show();
			break;
			case "getmore":
			$(".product_detail_n").show();
			break;
		}
	}
});
$(".overlayhidden,.select_type,.product_detail_n").click(function(event){
	var e=event||window.event;
	var s=e.target||e.srcElement;
	if(/overlayhidden/i.test(s.className)){
		$(".overlayhidden").hide();
	}
	else if(/select_type/i.test(s.className)){
		$(".select_type").hide();
		$(".menu").children().removeClass("on");
	}
	else if(/product_detail_n/i.test(s.className)){
		$(".product_detail_n").hide();
	}
});
$("menu div").click(function(){
	var d=$(this).data("type");
	switch(d){
		case "all":
		show(d,$(this));
		break;
		case "shi":
		show(d,$(this));
		$('.range_slider').jRange({
			from: 0,
			to: 100,
			step: 10,
			scale: [0,100],
			showLabels: false,
			showScale: false,
			format: '%s',
			width:200,
			showLabels: true,
			isRange : true
		});
		break;
		case "other":
		show(d,$(this));
		break;
	}
});
function show(e,ele){
	if(ele.hasClass("on")){
		ele.removeClass("on");
		$(".select_type").hide().children().hide();
	} else {
		ele.siblings().removeClass("on");
		ele.addClass("on");
		$(".select_type").show().children().hide();
		$(".select_type").children("[data-type='"+e+"']").show();
	}
}
$(".select_item ._items").children().click(function(){
	$(this).siblings().removeClass("on");
	$(this).addClass("on");
});
$("[data-type='all'] .left li").click(function(){
	var getindex=$(this).index();
	$(this).siblings().removeClass("on");
	$(this).addClass("on");
	$("[data-type='all'] .right ul").siblings().removeClass("on");
	$("[data-type='all'] .right ul").eq(getindex).addClass("on");
});
//选择地址
$(".selectaddress .item").click(function(){
	$(this).siblings().find(".slected").children("em").removeClass("on");
	$(this).find(".slected").children("em").addClass("on");
});
//消息选择
$(".msg_list .wrap").click(function(){
	var ex=$(this).data("expand");
	if(ex=="0"){
		$(this).find(".arrow em").attr("style","-webkit-transform: rotate(270deg);transform: rotate(270deg);");
		$(this).data("expand","1");
		$(this).children(".summary").addClass("detial").find(".summary_f").removeClass("summary_f").attr("style","max-height:auto;overflow:auto");
		myScroll.refresh();
	}
	else if(ex=="1"){
		$(this).find(".arrow em").attr("style","-webkit-transform: rotate(90deg);transform: rotate(90deg);");
		$(this).data("expand","0");
		$(this).children(".summary").removeClass("detial").find(".break").addClass("summary_f").removeAttr("style");
		myScroll.refresh();
	}
});
//图片延迟加载
if($("img.lazy").size()>0){
	$("img.lazy").lazyload();	
}
//支付，配送方式
if($(".sl_green").size()>0){
	$(".sl_green").click(function(){
		$(this).parent().children().removeClass("on");
		$(this).addClass("on");
	});
}
//计算+1
$(".cal .reduce").click(function(){
	var ele=$(this).parents(".cal").find(".txt");
	var num=ele.val();
	if(num!=""&&num>0){
		var newnum=parseInt(num)-1;
		ele.val(newnum);
	}
});
$(".cal .plus").click(function(){
	var ele=$(this).parents(".cal").find(".txt");
	var num=ele.val();
	if(num!=""&&num>0){
		var newnum=parseInt(num)+1;
		ele.val(newnum);
	}
});
//
$(".showcal").click(function(){
	$("#ling_chaye").show();
});
$(".ling_chaye .closed").click(function(){
	$("#ling_chaye").hide();
});
$("#pro_detail").on("touchstart",function(e){
	//e.preventDefault();
})
$("#pro_detail").on("touchmove",function(e){
	var wh=$(window).scrollTop()+$(window).height();
    var dh=$(document).height();
    if(wh-dh>-1){
    	
    }
})
$("#pro_detail").on("touchend",function(e){
})
