var app = angular.module('myApp', []);
app.controller('paodaiCtrl', function($scope, $filter) {
    $scope.count = 1; /*袋包装服务栏目输入框的初始值*/
    $scope.price = 10; /*泡袋的单价*/
    $scope.more = function() { /*更多斤数*/
        $scope.count = parseInt($scope.count) + 1;
        $scope.price = 10 * $scope.count;
    }
    $scope.less = function() { /*更少斤数*/
        if ($scope.count <= 1) {
            alert("至少需要输入1斤");
            return false;
        } else {
            $scope.count = parseInt($scope.count) - 1;
            $scope.price = 10 * $scope.count;
        }
    };
    $scope.valueChange = function() { /*input框值变化调用的函数*/
        $scope.count = parseInt($scope.count);
        $scope.price = 10 * $scope.count;
    };
    $scope.del = function() { /*删除泡袋时调用的函数*/
        var num = $scope.num;
         //*这里调用了append_paodai函数方法*/
        $scope.checkState=true;
        $scope.append_paodai();
        /*$("#packing").find("input[data-which='" + num + "']").trigger('click').removeAttr("checked");*/
        $(".new_paodai[data-which='" + num + "']").remove();
        $scope.append_p(); /* 这里调用了$scope.append_p函数判断是否添加问候语段落p*/
    }
});
app.controller('caigouCtrl', function($scope, $filter) {
    $scope.p_price = 325.0; /*产品价格*/
    $scope.inputval = 1; /*输入框斤数*/
    $scope.inputval = $filter('number')($scope.inputval, 1); /*输入框斤数保留一位小数*/
    $scope.zongjia = $scope.p_price * 1; /*总价*/
    $scope.zongjia = $filter('number')($scope.zongjia, 2); /*总价保留一位小数*/
    $scope.kucun = 300; /*初始化库存*/
    function syn(inputVal) {
        var inputval = inputVal;
        $scope.inputval = inputVal;
        $scope.inputval = $filter('number')($scope.inputval, 1);
        $scope.kucun = 300; /*保持常量库存*/
        $scope.kucun = $scope.kucun - inputVal;
        $scope.zongjia = $scope.p_price * $scope.inputval; /*总价等于单位产品价格乘以输入的斤数*/
        $scope.zongjia = $filter('number')($scope.zongjia, 2);
    }
    $scope.inputchange = function() {
        var inputVal = parseInt($scope.inputval);
        syn(inputVal);
    };
    $scope.more = function() {
        var inputVal = parseInt($scope.inputval);
        inputVal = inputVal + 1;
        syn(inputVal);
    };
    $scope.less = function() {
        var inputVal = parseInt($scope.inputval);
        if (inputVal <= 1) {
            alert("至少需要输入1斤");
            return false;
        } else {
            inputVal = inputVal - 1;
            syn(inputVal);
        }
    }
});
app.controller('appendctrl', function($scope, $compile, $element) {
    $scope.check = false;
    $scope.append_p = function() { /*  这里判断是否添加p段落*/
        var kk = $(".change").find(".new_paodai").length;
        console.log(kk);
        if (kk <= 0) {
            var word = "<p>我们能为您提供完善的代包装服务，如您需要，可从右边的侧边栏中选择您喜欢或者您需要的包装袋类型！</p>";
            $(".change").html(word);
        }
    }
    $scope.checkState=false;
    $scope.append_paodai = function() {
        var which = $scope.which_pd; /*获取哪个泡袋*/
        var imgsrc = $scope.imgsrc; /*获取泡袋图片的img*/
        if (!$scope.checkState) { /*这里ifelse实现按钮toggle功能的变化*/
            $scope.checkState=true;
            var kkm = $(".change p").length;
            if (kkm) {
                $(".change").html("");
            }
            var box = "<div class='new_paodai' data-which='" + which + "' ng-init='num=" + which + "' ng-controller='paodaiCtrl'><div class='img'><img src='" + imgsrc + "' alt='' /><span class='del' ng-click='del()'>删除</span></div><div class='num_change'><div class='count'><input type='text' ng-change='valueChange()' ng-model='count' /><span class='btn'><span class='up' ng-click='more()'>&and;</span><br /><span class='down' ng-click='less()'>&or; </span></span></div><span class='pd_pri'><span ng-bind='price|number:2'></span>元</span></div></div>";
            var el = $compile(box)($scope);
            $(".dbz_help .change").append(el); /*插入html到袋包装服务*/
        } else {
            $scope.checkState=false;
            $(".dbz_help .change").find(".new_paodai[data-which=" + which + "]").remove(); /*再次点击选择按钮清除选取的泡袋*/
            $scope.append_p();
        }
    };
});
