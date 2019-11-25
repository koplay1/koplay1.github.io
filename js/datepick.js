var month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
var month_name = ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();
function dayStart(month, year) {
	var tmpDate = new Date(year, month);
	//alert(tmpDate)
	return (tmpDate.getDay());
}
function daysMonth(month, year) {
	var tmp = year % 4;
	if (tmp == 0) {
		return (month_olympic[month]);
	} else {
		return (month_normal[month]);
	}
}
function refreshDate(){
	var str = "";
	var totalDay = daysMonth(my_month, my_year); //获取该月总天数
	var firstDay = dayStart(my_month, my_year); //获取该月第一天是星期几
	//alert(firstDay)
	var myclass;
	for(var i=0; i<firstDay; i++){ 
		str += "<li></li>"; //为起始日之前的日期创建空白节点
	}
	for(var i=1; i<=totalDay; i++){
		if((i<my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()) || my_year<my_date.getFullYear() || ( my_year==my_date.getFullYear() && my_month<my_date.getMonth())){ 
			myclass = " class=''"; //当该日期在今天之前时，以浅灰色字体显示
		}else if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
			myclass = " class=''"; //当天日期以绿色背景突出显示
		}else{
			myclass = " class=''"; //当该日期在今天之后时，以深灰字体显示
		}

		var str_day = i.toString();
		var colorday = my_year+"-"+(my_month+1)+"-"+paddingLeft(str_day,2);
		alert(colorday+"="+ new Date(colorday).getDay())
		if(new Date(colorday).getDay() == 6 || new Date(colorday).getDay()==0){
			myclass = " class='redcolor'";
		}
		str += "<li"+myclass+" onclick='pickup(this)'><div>"+i+"</div></li>"; //创建日期节点
	}
	holder.innerHTML = str; //设置日期显示
	ctitle.innerHTML = month_name[my_month]; //设置英文月份显示
	cyear.innerHTML = my_year; //设置年份显示
}
refreshDate();

prev.onclick = function(e){
	e.preventDefault();
	my_month--;
	if(my_month<0){
		my_year--;
		my_month = 11;
	}
	refreshDate();
}
next.onclick = function(e){
	e.preventDefault();
	my_month++;
	if(my_month>11){
		my_year++;
		my_month = 0;
	}
	refreshDate();
}
function pickup(_this){
	$("#txt_date").val(my_year+"-"+(my_month+1)+"-"+$(_this).text());
	$("li").removeClass("selected");
	$(_this).addClass("selected");
}
function paddingLeft(str,lenght){
	if(str.length >= lenght)
	return str;
	else
	return paddingLeft("0" +str,lenght);
}
