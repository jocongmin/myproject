$(function() {
	// 商品详情介绍、评价、风险保障标签页的鼠标移入事件
    $(".mailTab li").click(
	    function() {
		$(this).addClass("checked").siblings().removeClass("checked");
		$(this).closest("div").find(".mailTablePlan").eq(
			$(this).index()).show().siblings(".mailTablePlan")
			.hide();
		var loadflg = $("#recordDiv").attr("loadflg");
		if (loadflg == 1) {
		    $("#recordDiv").load(
			    item_path
				    + "/CommodityRecordAction!toRecord.do?cid="
				    + cid + "&tid=" + tid);
		    $("#recordDiv").attr("loadflg", "0");
		}
	});

/*    // 对比按钮的点击事件，貌似没用了
    $(".contrast_p").click(function() {
		var myStaute = $(this).attr("data-staute");
		if (!myStaute) {
		    $("input", this).attr("checked", true);
		    $(this).addClass("checked");
		    $(this).attr("data-staute", "1");
		} else {
		    $("input", this).attr("checked", '');
		    $(this).removeClass("checked");
		    $(this).removeAttr("data-staute");
		}
    });*/

/*    // 小图列表的鼠标移入事件
    $(".property_ul img").hover(function() {
		$(".property_ul img").removeClass("checked");
		$(this).addClass("checked");
    });
    // 没有用
    $(".detailTabTit>li").mouseover(function() {
		var ix = $(this).index();
		$(".detailTabTit>li").removeClass("curr");
		$(this).addClass("curr");
		$(".detailTabCon").prepend($("#detailli" + ix)[0]);
		$(".detailTabCon>li").removeClass("tcurr");
		$("#detailli" + ix).addClass("tcurr");

    });*/
/**
    $("#precord").click(
	    function() {
		var ahref = window.location.pathname + window.location.search;
		location.href = ahref + "#hrefpr";
		$(".mailTab li").eq(1).addClass("checked").siblings(
			".mailTab li").removeClass("checked");
		$(".mailTablePlan").eq(1).show().siblings(".mailTablePlan")
			.hide();
	    });

    $(".addYangpidiv").hover(function() {
	$(this).addClass("addYangpidivHover");
    }, function() {
	$(this).removeClass("addYangpidivHover");
    });

    var onetype = $(".headerNav h2 a").html();
    var twotype = $(".headerNav").html();
    if (onetype != undefined) {
	onetype = $.trim(onetype);
	if (onetype == "包装" && twotype.indexOf("泡袋") >= 0) {
	    $("#unit1").html("").html("起批量(把) 1把=100个");
	    $("#unit2").html("").html("/把");
	    $("#unit3").html("").html("/把");
	}
    }

    // 不管从任何入口进入详情页,都相当于浏览历史:当前浏览的商品在第一次加载此商品时不加入浏览历史
    util.setCookie("scan_" + mid, item_basepath + 'resize_500x500' + imgsrc
	    + ";" + bt + ";" + jg, 0);
    // 界面加载的时候,对已经存在cookie中的商品进行界面对比勾选选中效果
    if (document.cookie.length > 0) {
	var arrCookie = document.cookie.split("; ");
	var isFirst = true;// 用于区分样式显示
	var num = 1;
	for (var i = 0; i < arrCookie.length; i++) {
	    var arr = arrCookie[i].split("=");
	    if (arr[0].indexOf("commodity_") > -1 && arr[0].indexOf("_t") == -1) {// 添加的商品
		if (arr[0].split("commodity_")[1].indexOf(mid) > -1) {
		    $(".mj_db").addClass("mj_db_click");
		}
	    }

	}
    }

    // 对比特效
    $(".mj_db").hover(function() {
	$(this).addClass("mj_db_hover");
    }, function() {
	$(this).removeClass("mj_db_hover");
    });

    // 对比栏点击
    $(".contrast_p")
	    .toggle(
		    function() {
			$(".db_left").show().addClass("db_left_hover");
			var tt = $(".db_right_zj").size();
			var cs = ".c_" + mid;
			var ncs = $(cs).size();
			if (ncs < 1) {
			    $(".db_right").show();
			    if (tt < 4) {
				if (util.getCookie("commodity_" + mid) == ""
					|| util.getCookie("commodity_" + mid) == null) {
				    $(this).addClass("mj_db_click");
				    $(".db_right")
					    .prepend(
						    '<div class="db_right_zj c_'
							    + mid
							    + '"><img width="50" height="45" data-original="'
							    + imgsrc
							    + '">'
							    + '<div>'
							    + bt
							    + '</div><input type="hidden" value="'
							    + mid
							    + '" class="m_id_box"><div>'
							    + jg
							    + '</div></div>');
				    // $(".db_right_tt").first().detach();
				    // 加入到cookie:商品id=商品图片;商品标题;商品价格样式
				    util.setCookie("commodity_" + mid,
					    item_basepath + '/' + imgsrc + ";"
						    + bt + ";" + jg, 0);
				}
			    } else {
				alert("您最多只能添加4个服务到对比栏");
			    }
			    ;
			} else {
			    $(cs).detach();
			    var tt = $(".db_right_zj").size();
			    if (tt < 4) {
				// $(".dd_bottom").before('<div
				// class="db_right_tt">您还可以继续添加</div>');
				$(this).removeClass("mj_db_click");
				util.delCookie("commodity_" + mid);
				$(".db_right").show();
			    } else {
				alert("您最多只能添加4个服务到对比栏");
			    }
			    ;
			}
			;
			initCookie();
		    },
		    function() {// 对比栏取消
			$(".db_left").show().addClass("db_left_hover");
			var cs = ".c_" + mid;
			var ncs = $(cs).size();
			if (ncs < 1) {
			    var tt = $(".db_right_zj").size();
			    if (tt < 4) {
				var commodityinfo = util.getCookie("commodity_"
					+ mid);
				// 加入到cookie:商品id=商品图片;商品标题;商品价格样式
				if (commodityinfo == ""
					|| commodityinfo == null) {
				    $(this).addClass("mj_db_click");
				    $(".db_right")
					    .prepend(
						    '<div class="db_right_zj c_'
							    + mid
							    + '"><img width="50" height="45" data-original="'
							    + item_basepath
							    + '/'
							    + imgsrc
							    + '">'
							    + '<div>'
							    + bt
							    + '</div><input type="hidden" value="'
							    + mid
							    + '" class="m_id_box"><div>'
							    + jg
							    + '</div></div>');
				    // $(".db_right_tt").first().detach();
				    // 加入到cookie:商品id=商品图片;商品标题;商品价格样式
				    util.setCookie("commodity_" + mid,
					    item_basepath + '/' + imgsrc + ";"
						    + bt + ";" + jg, 0);
				}
			    } else {
				alert("您最多只能添加4个服务到对比栏");
			    }
			    ;
			} else {
			    $(cs).detach();
			    var tt = $(".db_right_zj").size();
			    if (tt < 4) {
				// $(".dd_bottom").before('<div
				// class="db_right_tt">您还可以继续添加</div>');
				$(this).removeClass("mj_db_click");
				util.delCookie("commodity_" + mid);
				$(".db_right").show();
			    } else {
				alert("您最多只能添加4个服务到对比栏");
			    }
			    ;
			}
			;
			initCookie();
		    });
    $('.leftdiv li:even').attr("class", "left_li_1");
    $('.pjsdiv li:even').attr("class", "left_li_1");
    **/
    // 代包装服务的复选框点击事件
/*    $(".packCK").click(
		    function() {
	    	$(".dbz_help .change p").remove();
	    	
			var checked = $(this).attr("checked"); // 复选框当前状态
			var commid = $(this).attr("value"); // 取值
			var packids = $("#packids").val();
			
			console.log("checked="+checked + "---" + commid);
			var shopNum = $("#shangpin").val();
			if (checked == "checked") { // 选中
			   // $(this).removeAttr("checked");
				var allNum = 0;
		        $("div.type").each(function(){
		    		var num = $(this).find("input").val();
		    		allNum += parseInt(num);
		    	})
		    	
		   		//console.log(allNum + "-=-=allNum-==--" + shopNum)
		        if (parseInt(allNum) >= parseInt(shopNum)) {
					alert("泡袋的个数过多！");
					if (shopNum == 0) {
						var word = $("<p>我们能为您提供完善的代包装服务，如您需要，可从右边的侧边栏中选择您喜欢或者您需要的包装袋类型！</p>");
			            $(".dbz_help .change").html(word);
					}
					return false;
				}
			   
			    packids = commid;
			} else { // 取消
				//$(".packCK").removeAttr("checked");
			    packids = packids.replace(commid, "");
			}
			//每斤的钱
			var money = 10.0;
			$("#packids").val(packids);
			
			if ($.trim(packids) == "") {
				$(this).removeAttr("checked");
				$(".type[value="+commid+"]").remove();
				 var num = $(".dbz_help .type").length;
			        var word = $("<p>我们能为您提供完善的代包装服务，如您需要，可从右边的侧边栏中选择您喜欢或者您需要的包装袋类型！</p>");
			        if (num == 0) {
			            $(".dbz_help .change").html(word);
			     }
		      
			} else {
				var beginNum = 0;
		        $("div.type").each(function(){
		    		var number = $(this).find("input").val();
		    		beginNum += parseInt(number);
		    	})
			  var box="";
			    box+="<div class='type' value="+ commid +">";
			    box+="<label class='yellow_tt'><span class='fb mr15' id='packname'>"+$("#" + packids).val()+"</span></label>";
			    if (beginNum == 0) {
			    	var numValue = Math.floor(shopNum);
			    	box+="<span class='dbz_num_bt order_num'><i>-</i><input type='text' value='"+ numValue +"' /><em>+</em></span>";
			    } else {
					box+="<span class='dbz_num_bt order_num'><i>-</i><input type='text' value='1' /><em>+</em></span>";
				}
			    box+="<span class='pri'>￥ " + money + "元</span>";
			    box+="<a href='javascript:;' class='light_blue ml15 del_dbz'>删除</a>";
			    box+="</div>";
               /* var box=$("<div class='new_paodai' ng-controller='paodaiCtrl'><div class='img'><img src='http://www.oteao.com:80/resize_200x200/Upload/Commodity/20150917/0917174510/20151015171952_748.tmp' alt='' /><span class='del'>删除</span></div><div class='num_change'><div class='count'><input type='text' ng-change='valueChange()' ng-model='count' /><span class='btn'><span class='up' ng-click='more()'>&and;</span><br /><span class='down' ng-click='less()'>&or; </span></span></div><span class='pd_pri'><span ng-bind='price|number:2'></span>元</span></div></div>");
			    $(".dbz_help .change").append(box);*/
               
			}
	});
            */                               
    
    /* Start 代包装服务 信息 */
	
    	$("#del_dbz").click(function() {
    		
	        $(this).parents(".type").remove();
	        //新加
	        $(".packCK").removeAttr("checked");
	        $("#packids").val("");
	        
	        var num = $(".dbz_help .type").length;
	        var word = $("<p>我们能为您提供完善的代包装服务，如您需要，可从右边的侧边栏中选择您喜欢或者您需要的包装袋类型！</p>");
	        if (num == 0) {
	            $(".dbz_help .change").html(word);
	        }
    	})

	/* end 代包装服务 信息 */
    
		    /**
    $(".que_1").mouseenter(function() {
	$('.tip1').show();
    });
    $(".que_2").mouseenter(function() {
	$('.tip2').show();
    });
    $('.tip1').mouseenter(function() {
	$('.tip1').show();
    }).mouseleave(function() {
	$('.tip1').hide();
    });
    $('.tip2').mouseenter(function() {
	$('.tip2').show();
    }).mouseleave(function() {
	$('.tip2').hide();
    });
    **/
    // 产品品论标签卡数值html
    $("#allRecord").html(
	    "<font color='#f86211' size=2>" + recordSum + "</font>");
    // 已有多少人评价html
    $("#plrs").html(recordSum);
/*    // 评论输入框html  没用层还没加载
    $("#recordText").html(
	    "<label style='color:#1775cc;float:left;'>(已有" + recordSum
		    + "人评价)</label>");*/
/*    // 发表评论from的提交事件
    $('#recordForm').submit(function() {
		$(this).ajaxSubmit({
		    success : function(data) {
			if (data == "ok") {
			    alert("评论已成功提交！");
			    history.go(0);
			    // gopage(1,null);
			} else {
			    alert("评论失败，请刷新页面后再试!");
			}
		    },
		    error : function(XMLResponse) {
			alert("评论失败，请刷新页面后再试!");
		    }
		});
		return false;
    });*/
    
    var xjb = "卓越";
/*    // zpfh这个域没有，所以默认都是"卓越"
    if ($("#zpfh").val() < 80) {
	xjb = "一般";
    } else if ($("#zpfh").val() > 79 && $("#zpfh").val() < 90) {
	xjb = "良好";
    } else if ($("#zpfh").val() > 89 && $("#zpfh").val() < 95) {
	xjb = "优异";
    } else {
	xjb = "卓越";
    }*/
    // 性价比描述html
    $("#xjb").html(xjb);
});


//发表评论点击事件函数
function dorecord() {
    $.ajax({
	url : item_path + "/CommodityRecordAction!isBuy.do",
	type : "post",
	data : {
	    cid : cid // 商品id
	},
	success : function(data) {
	    if (parseInt(data) == -1) {
		alert("出错啦！评论数大于定单数");
		return;
	    }
	    if (parseInt(data) == 0) {
		alert("您未购买过此商品，无法评论!");
	    } else if (parseInt(data) == 1) {
		alert("你已经评论过了!");
	    } else if (parseInt(data) == 2) {
		alert("你已经评论过了!你还有商品未购买或确认，不能评论！");
	    } else if (parseInt(data) == 4) {
		$("#recordDIV").show(100);
		// 定义将要去的描点位置
		var pos = $("#recordDIV").offset().top;
		// 实现平滑移动 1000代表时间ms
		$("html,body").animate({
		    scrollTop : pos
		}, 1000);
	    }
	},
	error : function() {
	    alert("您未购买过此商品，无法评论!");
	}
    });
}

// 产品评论列表区分页
function gopage(npage, apage) {
    var gourl = item_path + "/CommodityRecordAction!toRecord.do?cid=" + cid
	    + "&tid=" + typeId;
    if (null == apage) {
		gourl += "&nowPage=" + npage;
		$("#pagediv").load(gourl);
    } 
    else {
		if (apage == 0) {
		    if (npage > 1) {
				gourl += "&nowPage=" + (npage - 1);
				$("#pagediv").load(gourl);
		    }
		} 
		else {
		    if (npage != apage) {
				gourl += "&nowPage=" + (npage + 1);
				$("#pagediv").load(gourl);
		    }
		}
    }
}

// 提交评论
function doSave() {
    if ($("#wd").val() != "") {
		var zpv = 0;
		var zpvstr = "90";
		var wdsz = $("#wd").val().substring(1, $("#wd").val().length)
			.split(",");
		$("#wdv").val("");
		for (var i = 0; i < wdsz.length; i++) {
		    var n = $('#' + wdsz[i]).rateit('value') * 20;
		    $("#wdv").val($("#wdv").val() + "," + parseInt(n));
		    zpv += parseFloat(n);
		}
		zpv = zpv / parseFloat(wdsz.length);
		if (zpv.toString().indexOf(".") > -1) {
		    zpvstr = zpv.toString().substring(0,
			    zpv.toString().indexOf(".") + 2);
		} else {
		    zpvstr = zpv;
		}
		$("#zp").val(zpvstr);
    } 
    else {
		var n = $('#zpstar').rateit('value') * 20;
		$("#zp").val(parseInt(n));
    }
    $("#recordtext").val($("#recordtext").val().replace(/\s+/g, ""));
    if ($("#recordtext").val() != "") {
		$('#recordForm').submit(function() {
		    $(this).ajaxSubmit({
				success : function(data) {
				    if (data == "ok") {
					alert("评论已成功提交！");
					history.go(0);
					// gopage(1,null);
				    } else {
					alert("评论失败，请刷新页面后再试!");
				    }
				},
				error : function(XMLResponse) {
				    alert("评论失败，请刷新页面后再试!");
				}
		    });
		    return false;
		});
		// $('#recordForm').submit();
    } 
    else {
		$("#recordtext").focus();
		alert("请输入评论内容");
		return false;
    }
    return true;
}

/*// 貌似没用
function fatValue(v) {
    var n = v * 20;
    if (v <= 1) {
	return parseInt(n) + "分(差评)";
    } else if (v > 1 && v <= 3) {
	return parseInt(n) + "分(中评)";
    } else {
	return parseInt(n) + "分(好评)";
    }
}*/



/*// 貌似没用
function showMorePacks(typeid) {
    var result = window.showModalDialog(
	    "/CommodityAction!findMorePacking.do?id=" + typeid, window,
	    "dialogWidth=600px;dialogHeight=400px;resizable:yes;");
    if (typeof (result) == 'undefined') {
	result = window.ReturnValue;
    }
    return result;
}*/



// 点击查看详细参数对比按钮事件
function compareCommod() {
    var str = '';
    var k = 0;
    for (var i = 0; i < $(".otherCompare").size(); i++) {
		if ($($(".otherCompare")[i]).attr('checked') != undefined) {
			if (k < 4) {
				if(k!=0){
					str += ",";
				}
				str += "'" + $($(".otherCompare")[i]).attr('proid') + "'";
				k++;
		    }
		}
    }
    window.location.href = item_basepath + "/CommodityAction!compare.do?id="
	    + str;

}

// 添加购物车后提示层打叉按钮事件
function coseTcFn() {
    $(".tc_addcar").hide();
    if (intervalObj) {
    	clearInterval(intervalObj);
    }
    intervalObj = undefined;
    sec = 2;
}

var isAddCart = true;// 全局常量(是否可加入购物车)
var errorinfo = "";// 全局的错误信息提示
/*$(document).ready(function() {
});*/
/**
$(function() {
    // 大图切换
    $(".game163").slide({
	titCell : ".smallImg li",
	mainCell : ".bigImages",
	effect : "fold",
	autoPlay : false,
	delayTime : 200,
	startFun : function(index) {
	    $(".bigImages li").removeClass("jqzoom");
	    $(".bigImages li").eq(index).addClass("jqzoom");
	    $(".jqzoom").jqueryzoom({
		xzoom : 430,
		yzoom : 399,
		offset : 10,
		position : "left",
		preload : 1,
		lens : 1
	    });
	}
    });

    // 小图左滚动切换
    $(".game163 .smallScroll").slide({
	mainCell : "ul",
	delayTime : 100,
	vis : 5,
	effect : "left",
	autoPage : false,
	prevCell : ".sPrev",
	nextCell : ".sNext"
    });
});

var intervalObj = undefined;
var sec = 2;
**/
// 加入购物车按纽事件（memberStatus:未登录'',已登录未审核3,已登录已审核1）
function addToCart(commodityId, nowCount, type,memberStatus) {
	
	//判断商品和泡袋的个数
	var allNum = 0;
	$("div.type").each(function(){
		var num = $(this).find("input").val();
		allNum += parseFloat(num);
	})
	var shopNum = $("#shangpin").val();
		//console.log(allNum + "-=-=allNum-==--" + shopNum)
	if (allNum > parseInt(shopNum)) {
			alert("泡袋的个数过多！");
			return false;
	}
	
    var packids = $("#packids").val();
    // 获取其s
    
    if (memberStatus != "" && memberStatus != "1") {
	    alert("请完善资料，等待审核");
	    isAddCart = false;
	    errorinfo = "请完善资料，等待审核";
	    return false;
	}
    // 没有代包装id
    if ($.trim(packids) == "" || packids == undefined) { 
    	initAddToCart1(commodityId, nowCount, type,memberStatus);
    } 
    // 有代包装id
    else {
    	initAddToCart(commodityId, nowCount, type, packids);
    }
}

// 初始化加入购物车的相关参数   
function initAddToCart1(commodityId, nowCount, type,memberStatus) {
	isAddCart = true;
	console.log('initAddToCart1');
	$("#quyangdiv").hide();
	if (memberStatus != "" && memberStatus != "1") { // 已登录待审核
	    alert("请完善资料，等待审核");
	    isAddCart = false;
	    errorinfo = "请完善资料，等待审核";
	    return false;
	}
    var addCount = 0;
    if (type == 1) { // 购买正常商品
    	console.log('正常商品');
		addCount = $("#shangpin").val(); // 数量
		console.log(parseInt(addCount));
		console.log(parseFloat(addCount));
		if (parseFloat(addCount) == 0) {
		    alert("请输入采购数量");
		    isAddCart = false;
		    errorinfo = "请输入采购数量";
		    return false;
		}
		if (parseFloat(addCount) > nowCount) { // 要添加的数量大于可用库存
		    alert("采购量大于实际库存,请重新输入采购量");
		    isAddCart = false;
		    errorinfo = "采购量大于实际库存,请重新输入采购量";
		    return false;
		}
    } 
    else if (type == 2) { // 取样品
    	console.log('样品');
		addCount = $("#nayang").val(); // 数量
		if (parseInt(addCount) == 0) {
		    alert("请输入拿样数量");
		    isAddCart = false;
		    errorinfo = "请输入拿样数量";
		    return false;
		}
		if (parseInt(addCount) > nowCount) { // 要取样的数量大于可用库存
		    alert("拿样数大于实际库存,请重新输入拿样数");
		    isAddCart = false;
		    errorinfo = "拿样数大于实际库存,请重新输入拿样数";
		    return false;
		}
    }

    // nowCount
    if (isAddCart) { // 可以加入购物车
    	$.ajax({
		    type : "POST",
		    url : item_path + "/Order!addToCart.do?commodityId="
			    + commodityId + "&type=2&addCount=" + addCount,
		    contentType : "application/x-www-form-urlencoded; charset=utf-8",
		    error : function() {
				// 加入购物车网络超市错误信息提示
				alert("网络连接异常");
		    },
		    success : function(result) {
				try {
				    var obj = eval('(' + result + ')');
				    if (obj) {
						if (obj.success == "1") {
						    // 登录成功,跳转到首页
						    $(".tc_addcar").show();
						    //$(".addYangpidiv").removeClass(
							//    "addYangpidivHover");
						    intervalObj = setInterval(function() {
								if (sec == 1) {
								    coseTcFn();
								} 
								else {
								    sec--;
								}
						    }, 1000);
		
						} 
						else {
						    // 加入购物车失败错误提示信息
						    alert("加入购物车失败");
						}
				    }
				} 
				catch (e) {
				    window.location.href = item_path
					    + "/MemberAction!toLogin.do";
				}
		    }
		});
    } 
    else {
    	alert(errorinfo);
    }
}

// 领取样品按钮事件    初始化加入购物车的相关参数
function initAddToCart(commodityId, nowCount, type, packId) {
	isAddCart = true;
	console.log('initAddToCart');
	$("#quyangdiv").hide();
	
	
    var addCount = 0;
    if (type == 1) { // 正常商品
    	console.log('正常商品');
		addCount = $("#shangpin").val(); // 商品数量
		console.log(parseInt(addCount));
		console.log(parseFloat(addCount));
		if (parseFloat(addCount) == 0) {
		    alert("请输入采购数量");
		    isAddCart = false;
		    errorinfo = "请输入采购数量";
		    return false;
		}
		if (parseFloat(addCount) > nowCount) {
		    alert("采购量大于实际库存,请重新输入采购量");
		    isAddCart = false;
		    errorinfo = "采购量大于实际库存,请重新输入采购量";
		    return false;
		}
    } 
    else if (type == 2) { // 样品
    	console.log('样品');
		addCount = $("#nayang").val(); // 样品数量
		if (parseInt(addCount) == 0) {
		    alert("请输入拿样数量");
		    isAddCart = false;
		    errorinfo = "请输入拿样数量";
		    return false;
		}
		if (parseInt(addCount) > nowCount) {
		    alert("拿样数大于实际库存,请重新输入拿样数");
		    isAddCart = false;
		    errorinfo = "拿样数大于实际库存,请重新输入拿样数";
		    return false;
		}
    }
    var dataPackIds = [];
    
	$("div.type").each(function(){
		
		var commodityId = $(this).attr("value");
		var commodityNum = $(this).find("input").val();
		
		var temp = [];
		temp.push('{"packId":');
	    temp.push(commodityId);
	    temp.push(',"number":');
	    temp.push(commodityNum);
	    temp.push('}');
	    
	    dataPackIds.push(temp.join(""));
		    
	})
	var testdata =("[" + dataPackIds + "]").toString();
	
	var dataCommodity = {"packIdArr": testdata};
	
    // nowCount
    if (isAddCart) {
			$.ajax({
			    type : "POST",
			    url : item_path + "/Order!addToCart.do?commodityId="
				    + commodityId + "&type=2&addCount=" + addCount
				    + "&=packId" + packids,
			    contentType : "application/x-www-form-urlencoded; charset=utf-8",
			    dataType : "json",
		        data:dataCommodity,
		        traditional: true,
			    error : function() {
					// 加入购物车网络超市错误信息提示
					alert("网络连接异常");
			    },
			    success : function(result) {
					try {
						//alert(result.success + "---=-=");
					    //var obj = eval('(' + result + ')');
					    if (result) {
							if (result.success == "1") {
							    // 登录成功,跳转到首页
							    $(".tc_addcar").show();
							    //$(".addYangpidiv").removeClass(
								//    "addYangpidivHover");
							    intervalObj = setInterval(function() {
									if (sec == 1) {
									    coseTcFn();
									} 
									else {
									    sec--;
									    // $('#sec').text(sec);
									}
							    }, 1000);
			
							} else {
							    // 加入购物车失败错误提示信息
							    alert("加入购物车失败");
							}
					    }
					} 
					catch (e) {
						alert(e)
					    window.location.href = item_path
						    + "/MemberAction!toLogin.do";
					}
			    }
			});
    } 
    else {
    	alert(errorinfo);
    }
}

// 商品收藏
/**
function addMemberCollect(commodityId, memberId) {
    $.ajax({
	type : "POST",
	url : item_path + "/MemberAction!addMemberCollect.do?commodityId="
		+ commodityId + "&memberId=" + memberId,
	contentType : "application/x-www-form-urlencoded; charset=utf-8",
	error : function(data) {
	    // 会员登录网络超市错误信息提示
	    // alert(data.responseText);
	    alert("网络连接超时");
	},
	success : function(result, textStatus) {
	    try {
		var obj = $.parseJSON(result);
		if (obj.ok) {
		    // 登录成功,跳转到首页
		    window.location = item_path + "/MemberAction!collect.do";
		} else {
		    // 登录失败错误提示信息
		    alert(obj.error);
		}
	    } catch (e) {// 跳转到登陆界面
		window.location.href = item_path + "/MemberAction!toLogin.do";
	    }
	}
    });
}

// 修改商品数量addCount参数可以是负数
function operCommodityCount(commodityId, addCount, type) {
    var mount = 0;
    if (type == 0) {
	var c = $("#shangpin").val();
	mount = c;
	if (c == "") {
	    alert("请输入购买数量");
	    isAddCart = false;
	    errorinfo = "请输入购买数量";
	    return false;
	}
	// 当前的填写数量
	var currentNum = parseInt($("#shangpin").val());
	if (currentNum + addCount <= 0) {// 如果修改后的数量小于0则做删除操作
	    $("#shangpin").val(0);
	    $("#weight").html("0");// 总斤数
	    $("#totalPrice").html("0");// 总价
	    isAddCart = false;
	    errorinfo = "请填写大于0的采购量";
	    return false;
	}
	addCount = addCount + currentNum;
    } else if (type == 1 || type == 4) {
	if (addCount == 0) {
	    isAddCart = false;
	    errorinfo = "请输入购买数量";
	    return false;
	}
	addCount = addCount;
	if (type == 1) {
	    mount = $("#weight").text();
	}
	if (type == 4) {
	    mount = $("#weight1").text();
	}
    } else if (type == 3) {// 样品
	var nayang = $("#nayang").val();
	mount = nayang;
	if (nayang == "") {
	    alert("请输入拿样数量");
	    isAddCart = false;
	    errorinfo = "请输入拿样数量";
	    return false;
	}
	// 当前的填写数量
	currentNum = parseInt($("#nayang").val());
	if (currentNum + addCount <= 0) {// 如果修改后的数量小于0则做删除操作
	    $("#nayang").val(0);// 数量
	    isAddCart = false;
	    errorinfo = "请填写大于0的采购量";
	    return false;
	}
	addCount = addCount + currentNum;

    }
    url = item_path + '/CommodityAction!getBestPriceRange.do?id=' + commodityId
	    + '&addCount=' + addCount;
    $
	    .ajax({
		url : url,
		type : "post",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		success : function(result) {
		    var obj = eval('(' + result + ')');
		    if (obj) {
			if (obj.ok) {
			    if (parseFloat(obj.ok) < 0) {
				var lastPriceRange = 0;
				if (type == 0 || type == 1) {
				    lastPriceRange = priceRange;
				    $("#shangpin").val(obj.stock);// 数量
				    alert("此商品最多购买" + obj.stock + "件");
				}
				if (type == 3 || type == 4) {
				    lastPriceRange = priceRange;
				    if (parseInt($("#nayang").val()) + 1 <= parseInt(obj.stock)) {
					$("#nayang").val(addCount);// 数量
				    } else {
					$("#nayang").val(obj.stock);// 数量
					alert("此商品最多购买" + obj.stock + "件");
				    }

				}
				isAddCart = true;
				errorinfo = "";
			    } else {
				if (parseInt(type) < 3) {
				    // 获取某个区间的最优价格成功
				    $("#bestPrice").html("￥" + obj.ok);// 单价
				    $("#shangpin").val(addCount);// 数量
				    $("#weight").html(addCount);// 总斤数
				    $("#totalPrice").html(
					    (addCount * obj.ok).toFixed(2));// 总价
				} else {
				    $("#nayang").val(addCount);// 数量
				}
				isAddCart = true;
				errorinfo = "";
			    }
			} else {
			    // //获取某个区间的最优价格失败
			    alert("获取此商品数量的区间价格失败,请刷新");
			}
		    }
		},
		error : function() {
		    alert("获取此商品数量的区间价格失败,请刷新");
		}
	    });
}
$(document).ready(function() {
    $(".detailLeftBox li").mouseover(function() {
	$(this).siblings("li").removeClass("curr");
	$(this).addClass("curr");
    });
    initCookie();
});
$("img").lazyload({
    effect : "fadeIn",
    threshold : 200,
    event : "mouseover"
});

var flag = false;
function limitImage(ImgD) {
    var areaWidth = 468; // 你放置图片区域的宽度。
    var areaHeight = 388; // 你放置图片区域的高度。
    var image = new Image();
    image.onload = function() {
	if (image.width > 0 && image.height > 0) {
	    flag = true;
	    if (image.width / image.height >= areaWidth / areaHeight) {
		if (image.width > areaWidth) {
		    ImgD.width = areaWidth;
		    ImgD.height = (image.height * areaWidth) / image.width;
		} else {
		    ImgD.width = image.width;
		    ImgD.height = image.height;
		}
		ImgD.alt = image.width + "×" + image.height;
	    } else {
		if (image.height > areaHeight) {
		    ImgD.height = areaHeight;
		    ImgD.width = (image.width * areaHeight) / image.height;
		} else {
		    ImgD.width = image.width;
		    ImgD.height = image.height;
		}
		ImgD.alt = image.width + "×" + image.height;
	    }
	}
    }
    image.src = ImgD.src;
}
**/
/*// 大图片区域
$(".jqzoom").jqueryzoom({
    xzoom : 350,
    yzoom : 350,
    offset : 10,
    position : "right",
    preload : 1,
    lens : 1
});
// 小图列表区域
$("#spec-list").jdMarquee({
    deriction : "left",
    width : 435,
    height : 72,
    step : 2,
    speed : 4,
    delay : 10,
    control : true,
    _front : "#spec-right",
    _back : "#spec-left"
});*/
/**
$("#spec-list img").bind("mouseover", function() {
    var src = $(this).attr("src");
    $("#spec-n1 img").eq(0).attr({
	src : src.replace("\/n5\/", "\/n1\/"),
	jqimg : src.replace("\/n5\/", "\/n0\/")
    });
});
**/
