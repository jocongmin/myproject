/*
 * 商品前端工具类
 * * 创建者:黄琼
 */
var util = util || {};


/**
 * 返回当前正在执行的url
 * 创建者:黄琼
 * @returns
 */
util.getCurURL = function(){
	return window.location.pathname + window.location.search;
}

/**
 * 功能：对带有参数的url进行过滤:url--需要过滤的地址;para-需要过滤的参数;pvalue-参数过滤的代替值
 * 创建者:黄琼
 */
util.filtURL = function(url, para,pvalue){
	var e, f;
	//如果不存在任何url和参数,直接返回空
	if (!url && !para) {
		return ""
	} else {
		//无参的url,直接返回url
		if (!para) {
			e = window.location.pathname + window.location.search;
			f = url;
		} else {//参数过滤
			e = url;
			f = para;
		}
	}
	return e.replace(new RegExp("(^|\\?|&)" + f + "=([^&]*)", "gi"), pvalue);
}

/**
 * 获取url中参数param的值(url为空,获取当前url的参数值)
 * 创建者:黄琼
 * @param param
 * @param url
 * @returns
 */
util.getQueryParam = function(param,url){
	//匹配带有参数的正则表达式,不区分大小写
	var c = new RegExp("(^|\\?|&)" + param + "=([^&]*)(\\s|&|$)", "i");
	var d;
	if (url) {//url不为空
		d = url;
	} else {//如果url为空,获取当前的执行url
		d = window.location.search;
	}
	if (c.test(d)) {
		return RegExp.$2;
	}
	return "";
}


//格式化日期
util.strShortDateTime=function(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

//长时间，形如 (2003-12-05 13:04:06)
util.strLongDateTime=function(str) {
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null) return false; 
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}

//短时间，形如 (13:04:06)
util.isLongTime=function(str) {
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
    if (a == null) { alert('输入的参数不是时间格式'); return false; }
    if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
        alert("时间格式不对");
        return false
    }
    return true;
}


//验证是否为数字
util.isNumber=function(oNum) {
    if (!oNum) return false;
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum)) return false;
    try {
        if (parseFloat(oNum) != oNum) return false;
    }
    catch (ex) {
        return false;
    }
    return true;
}

//验证是否为金额
util.isDigit=function(s) { var patrn = /^-?\d+\.{0,}\d{0,}$/; if (!patrn.exec(s)) { return false } else { return true } }


//验证是否为空
util.isNull=function(str) {
    var result = false;
    str = lrTrim(str);
    if (str.length == 0) {
        result = true;
    }
    return result;
}

//通过id获取当前对象
util.g=function(objId) {
    return document.getElementById(objId);
}
//去除左右边空格
util.lTrim=function(str) {
    if (str.charAt(0) == " ") {
        //如果字串左边第一个字符为空格 
        str = str.slice(1); //将空格从字串中去掉 
        //这一句也可改成 str = str.substring(1, str.length); 
        str = util.lTrim(str);    //递归调用 
    }
    return str;
}
//rTrim()去掉字串右边的空格 
util.rTrim=function(str) {
    var iLength;
    iLength = str.length;
    if (str.charAt(iLength - 1) == " ") {
        //如果字串右边第一个字符为空格 
        str = str.slice(0, iLength - 1); //将空格从字串中去掉 
        //这一句也可改成 str = str.substring(0, iLength - 1); 
        str = util.rTrim(str);    //递归调用 
    }
    return str;
}


//cookie处理
//expiresHours为0时不设定过期时间，即当浏览器关闭时cookie自动消失
util.setCookie=function(name,value,expiresHours){
	var cookieString=name+"="+escape(value); 
	//判断是否设置过期时间 
	if(expiresHours>0){ 
		var date=new Date(); 
		date.setTime(date.getTime()+expiresHours*3600*1000); 
		cookieString=cookieString+"; path=/; expires="+date.toGMTString(); 
	} 
	document.cookie=cookieString+"; path=/;";
}
//根据指定的名字删除cookie:浏览器中删除cookie是把cookie设置成过去时间,如果删除一个，
//再删除同一个时要设置更早的时间:针对两个不同的页面删除cookie一定要设置域
util.delCookie=function(name){
	var date=new Date();
	var oldDate =util.getCookie(name+"_t");
	if(oldDate){
		date=new Date(oldDate); 
		date.setTime(date.getTime()-10000);
	}else{
		date.setTime(date.getTime()-10000);
	}
	var v = util.getCookie(name); 
	document.cookie=name+"="+escape(v)+"; path=/; expires="+date.toGMTString();
	util.setCookie(name+"_t",date);
}
//根据指定的名字获取cookie值
util.getCookie=function(name){
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split("; "); 
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("="); 
		if(arr[0]==name)return unescape(arr[1]); 
	} 
	return "";
}
//trim() 去掉字串两边的空格 
util.lrTrim=function(str) {
    return util.lTrim(util.rTrim(str));
}


/**
 * 陈成阳加入的前端公共方法
 */
 
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
 var o = {
		    "M+" : this.getMonth()+1, //月份         
		    "d+" : this.getDate(), //日         
		    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
		    "H+" : this.getHours(), //小时         
		    "m+" : this.getMinutes(), //分         
		    "s+" : this.getSeconds(), //秒         
		    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
		    "S" : this.getMilliseconds() //毫秒   
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}

//String 字符串类型的扩展
//去除左，右空格和两边空格
//保留字符


//除去左边空白 
String.prototype.LTrim = function() {
    return this.replace(/^s+/g, "");
}
// 除去右边空白 
String.prototype.RTrim = function() {
    return this.replace(/s+$/g, "");
}
// 除去两边空白 
String.prototype.trim = function() {
    return this.replace(/(^s+)|(s+$)/g, "");
}
// 保留数字 
String.prototype.getNum = function() {
    return this.replace(/[^d]/g, "");
}
// 保留字母 
String.prototype.getEn = function() {
    return this.replace(/[^A-Za-z]/g, "");
}
// 保留中文 
String.prototype.getCn = function() {
    return this.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, "");
}
//HTML编码 
String.prototype.HTMLEncode = function() {
    var re = this;
    var q1 = [ /x26/g, /x3C/g, /x3E/g, /x20/g ];
    var q2 = [ "&", "<", ">", " " ];
    for ( var i = 0; i < q1.length; i++)
        re = re.replace(q1[i], q2[i]);
    return re;
}

