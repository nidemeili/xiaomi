//根据id查找页面元素
function $id(id){
	return document.getElementById(id);
}

//获取任意区间值
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}

//随机颜色值获取
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i =1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}
//日期格式
function dateToString(sign){
	//如果用户不传递任何参数  默认日期间隔符号是  - 
	/*if( !sign ){
		sign = "-";
	}*/
	sign = sign || "-";//如果sign是未定义，就按默认值 "-"
	var d = new Date();
	var y = d.getFullYear();
	var m =toTwo( d.getMonth() + 1 ) ;
	var _date =toTwo( d.getDate() );
	var h =toTwo( d.getHours() );
	var min =toTwo( d.getMinutes() );
	var s =toTwo( d.getSeconds() );
	return y + sign + m + sign + _date + " " + h + ":" + min + ":" + s;
}
//自动补零
//如果得到的是小于10的数 就 拼接0
function toTwo(val){
	return val < 10 ? "0" + val : val;
}

//将一个字符串转成日期
function stringToDate(str){
    return  new Date(str);
}
//时间差
function diff(start,end){
	return Math.abs( start.getTime() - end.getTime() ) / 1000;
}

//动态创建元素
function createEle(ele){
	return document.createElement(ele);
}
//碰撞函数
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetWidth + obj1.offsetLeft;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetHeight + obj1.offsetTop;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetWidth + obj2.offsetLeft;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetHeight + obj2.offsetTop;
	
	//如果碰不上   返回false  碰上了就返回true
	if( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2){
		return false;
	}else{
		return true; //碰上了
	}
}
//获取非行内元素样式
function getStyle(obj,attr){ //obj 操作对象  attr操作属性
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
//运动js
//obj 代表当前操作的对象     json中存储的是要操作的属性和目标值       fn 用来接收一个函数
function startMove(obj,json,fn){  //  {"width":300,"height":300}
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;// 当开关变量的值为 true时，运动结束，可以停止定时器了		
		for(var attr in json){		
			var current = 0;
			if(attr == "opacity"){
				//操作透明度
				current = parseFloat( getStyle( obj,attr ) ) * 100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) );//操作空间定位
			}else{
				//操作的是带有像素值的样式
				current = parseInt( getStyle(obj,attr) );//获取当前操作对象的实际值
			}
			var speed = (json[attr] - current) / 10;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			if( json[attr] != current ){
				//如果目标值 和 当前操作的样式值不相等，就不能停止定时器 
				flag = false;				
			}
			//上面的条件不满足  继续执行运动
			if(attr == "opacity"){
				//操作透明度
				obj.style.opacity = (current + speed) / 100;
			}else if(attr == "zIndex"){
				
				obj.style.zIndex = json[attr] ;
				
			}else{
				//操作的是带有像素值的样式
				obj.style[attr] = current + speed + "px";
			}		
		}		
		//如果flag为true   就停止定时器		
		if(flag){
			clearInterval(obj.timer);
			//一个动作完成后,进入下一个动作(也就是要调用下一个函数)
			if(fn){ //判断如果有函数传递过来，就调用
				fn();
			}
		}
		
	},30)
}
function getStyle(obj,attr){
	return window.getComputedStyle ? window.getComputedStyle(obj,false)[attr] : obj.currentStyle[attr];
}
//存 cookie  document.cookie = "键=值"  时间
function setCookie(name,val,day){
	var d = new Date();
	d.setDate(d.getDate() + day);
	document.cookie = name + "=" + val + ";expires=" +  d;
}

//取cookie
function getCookie(name){
	
	var str = document.cookie;//uname=张三; upwd=123456;
	var arr = str.split("; "); // [uname=张三，upwd=123456];
	for(var i = 0; i < arr.length; i++){
		var cur = arr[i].split("=");
		if(cur[0] == name){
			return  cur[1];
		}
	}
	
	return "";
	
}
// 删除cookie  设置cookie的时候给个过期时间
function removeCookie(name){   
	setCookie(name,"",-1);
}
