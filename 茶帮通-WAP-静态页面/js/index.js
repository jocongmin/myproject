//时间倒计时
function showTime(id, time_distance) {
	this.id = id;
	this.time_distance = time_distance*1000;
}
showTime.prototype.setTimeShow = function () {
	var timer = $("#"+this.id);
	var str_time;
	var int_day, int_hour, int_minute, int_second;
	time_distance = this.time_distance;
	this.time_distance = this.time_distance - 1000;
	if (time_distance > 0) {
	int_day = Math.floor(time_distance / 86400000);
	if(int_day<10){
		int_day="0"+int_day;
	}
	time_distance -= int_day * 86400000;
	int_hour = Math.floor(time_distance / 3600000);
	if(int_hour<10){
		int_hour="0"+int_hour;
	}
	time_distance -= int_hour * 3600000;
	int_minute = Math.floor(time_distance / 60000);
	if(int_minute<10){
		int_minute="0"+int_minute;
	}
	time_distance -= int_minute * 60000;
	int_second = Math.floor(time_distance / 1000);
	if(int_second<10){
		int_second="0"+int_second;
	}
	str_time="<em>"+int_hour+"</em>:<em>"+int_minute+"</em>:<em>"+int_second+"</em>";
	timer.html(str_time);
	var self = this;
	setTimeout(function () { self.setTimeShow(); }, 1000);
	} else {
		timer.html("活动已结束！");
		return;
	}
}
$(".lefttime").each(function(index, element) {
	var id=$(this).attr('id');
	var time=$(this).data('time');
	var st = new showTime(id,time);
	st.setTimeShow();
});
