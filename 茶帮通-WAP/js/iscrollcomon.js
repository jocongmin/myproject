//icroll滑动事件
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	topOffset=$(".pullDown").height();
var isLoading=false;//预防多次下拉
var getHeadH=$(".header").outerHeight();
var getDataH=$(".getdata").outerHeight();
var getwindowH=$(window).outerHeight();
loaded();
function loaded () {
	pullDownEl = $('.pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = $('.pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new IScroll('.scroller_list', {
		useTransition: true,
		scrollbars: true,
		preventDefault:false,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
			fadeScrollbars: true,
			probeType: 1
		});
		if(getHeadH+(topOffset*2)+getDataH<getwindowH){
			$(".pullDown").hide();
			$(".pullUp").hide();
		}
		else{
			myScroll.scrollTo(0,-topOffset,500,IScroll.utils.ease.quadratic);
		}
	}
	//开始滚动
	myScroll.on("scrollStart",function(){
	//console.log("开始");
	});
	//滚动事件
	myScroll.on("scroll",function(){
	//下拉
	if (this.y > 40 && !pullDownEl.hasClass('flip')&&!isLoading) {
			pullDownEl.addClass("flip");
			pullDownEl.children(".pullDownLabel").text('松开刷新...');
			this.minScrollY = 0;
			isLoading=true;
	}
	else if (this.y < 40 && pullDownEl.hasClass('flip')&&!isLoading) {
		pullDownEl.removeClass('flip');
		pullDownEl.children('.pullDownLabel').text('下拉刷新...');
		this.minScrollY = -pullDownOffset;
	}
	//上拉
	else if (this.y < (this.maxScrollY-20) && !pullUpEl.hasClass('flip')&&!isLoading) {
		pullUpEl.addClass('flip');
		pullUpEl.children('.pullUpLabel').text('松开刷新...');
		this.maxScrollY = this.maxScrollY;
		isLoading=true;
	}
	else if (this.y > (this.maxScrollY-20) && pullUpEl.hasClass('flip')&&!isLoading) {
		pullUpEl.removeClass('flip');
		pullUpEl.children('.pullUpLabel').text('上拉刷新...');
			this.maxScrollY = pullUpOffset;
		}
	});
	//滚动到底部或者顶部，触发的事件
	myScroll.on('scrollEnd',function(){
	if (pullDownEl.hasClass('flip')) {
		pullDownEl.removeClass('flip').addClass('loading');
		pullDownEl.children('.pullDownLabel').text('正在加载...');				
		pullDownAction();
	}
	else if (pullUpEl.hasClass('flip')) {
		pullUpEl.removeClass('flip').addClass('loading');
		pullUpEl.children('.pullUpLabel').text('正在加载...');				
			pullUpAction();	
		}
	});
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);