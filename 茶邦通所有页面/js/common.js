//替换样式
$(document).ready(function(){
	$(".mailTab li").hover(function(){
		$(this).addClass("checked").siblings().removeClass("checked");
		$(this).closest("div").find(".mailTablePlan").eq($(this).index()).show().siblings(".mailTablePlan").hide();
	})
});

