// ================================================================================================
// 自定义双开日期框
// @author phpbin
// ------------------------------------------------------------------------------------------------
(function($) {        
$.fn.datapick = function(options) {
    if ( $(this).size()>0)
	{
        $.CPCAL.init();
	    var param     = {};
	    var arr      =  $(this).attr('src').split(":"); 
	    param.id     =  arr[0];
	    param.tipId  =  arr[1];
	    param.iconId =  arr[2];
	    $("#"+param.id).cal(param);
	}
	    return this;
    }
})(jQuery);


// --------- 酷讯代码 ---------------------------------------------------------------------------
(function($){

	var today = new Date();
	var utilDate = new Date();
	var weeks = ["日","一","二","三","四","五","六"];
	var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
	// 节日
	var festivals=[];
	festivals["c11"]="春节";//春节
	festivals["c55"]="端午";//端午
	festivals["51"]="五一";//51
	festivals["c815"]="中秋";//中秋
	festivals["101"]="国庆";//十一
	festivals["11"]="元旦";//元旦
	var currYear = today.getFullYear();
	if(currYear==2012 || currYear==2013 || currYear==2016 || currYear==2017 || currYear==2020) {
		festivals["44"]="清明";//清明
	} else {
		festivals["45"]="清明";//清明
	}
	// 农历
	var CalendarData=new Array(20);
	CalendarData[0]=0x41A95;
    CalendarData[1]=0xD4A;
    CalendarData[2]=0xDA5;
    CalendarData[3]=0x20B55;
    CalendarData[4]=0x56A;
    CalendarData[5]=0x7155B;
    CalendarData[6]=0x25D;
    CalendarData[7]=0x92D;
    CalendarData[8]=0x5192B;
    CalendarData[9]=0xA95;
    CalendarData[10]=0xB4A;
    CalendarData[11]=0x416AA;
    CalendarData[12]=0xAD5;
    CalendarData[13]=0x90AB5;
    CalendarData[14]=0x4BA;
    CalendarData[15]=0xA5B;
    CalendarData[16]=0x60A57;
    CalendarData[17]=0x52B;
    CalendarData[18]=0xA93;
    CalendarData[19]=0x40E95;
	var madd=new Array(12);
    madd[0]=0;
    madd[1]=31;
    madd[2]=59;
    madd[3]=90;
    madd[4]=120;
    madd[5]=151;
    madd[6]=181;
    madd[7]=212;
    madd[8]=243;
    madd[9]=273;
    madd[10]=304;
    madd[11]=334;

	function GetBit(m, n) {
		return (m>>n) & 1;
	}
	function add0(num) {
		num = parseInt(num);
		if (num < 10) {
			return "0" + num;
		}
		return num + "";
	}
	function focusLast(obj) {
		var text = obj.createTextRange();
		text.collapse(false);
		text.select();
	}
	function isLeapYear(year) {
		return ((year%4 == 0 && year%100 != 0) || year%400 == 0);
	}
	function e2c(year, month, day) {
		month--;
		var total,m,n,k;
		var isEnd=false;
		var tmp=year;

		if (tmp<1900) tmp+=1900;
		total = (tmp-2001)*365 + Math.floor((tmp-2001)/4) + madd[month] + day - 23;
		if (year%4==0 && month>1) total++;
		for(m=0; ; m++) {
			k = (CalendarData[m]<0xfff) ? 11 : 12;
			for (n=k; n>=0; n--) {
				if (total <= 29 + (+GetBit(CalendarData[m],n))) {
					isEnd = true;
					break;
				}
				total = total - 29 - GetBit(CalendarData[m],n);
			}
			if (isEnd) break;
		}

		var cYear = 2001 + m;
		var cMonth = k-n+1;
		var cDay = total;

		if (k == 12) {
			if (cMonth == Math.floor(CalendarData[m]/0x10000)+1) cMonth = 1-cMonth;
			if (cMonth > Math.floor(CalendarData[m]/0x10000)+1) cMonth--;
		}

		return {"cy":cYear, "cm":cMonth, "cd":cDay};
	}
	function nextMonth(year, month, i) {
		var n_month = new Date();

		var nmonth = +month, nyear = +year;

		for (var de=0; de<i; de++) {
			nmonth = nmonth+1 > 11 ? 0 : nmonth+1;
			nyear = nmonth==0 ? nyear+1 : nyear;
		}

		n_month.setFullYear(nyear, nmonth, 1);

		return n_month;
	}
	function nextDay(year, month, date, i) {
		var n_date = new Date();

		var ndate = +date, nmonth = +month, nyear = +year;

		for (var de=0; de<i; de++) {
			if (ndate+1 > monthDays[nmonth]) {
				ndate = (ndate+1 > monthDays[nmonth]) ? 1 : ndate+1;
				nmonth = (ndate==1||2) ? nmonth+1 : nmonth;
				nmonth = (nmonth > 11) ? 0 : nmonth;
				nyear = (nmonth == 0) ? nyear+1 : nyear;
			} else {
				ndate = ndate+1>monthDays[nmonth] ? 1 : ndate+1;
			}
		}

		n_date.setFullYear(nyear, nmonth, ndate);

		return n_date;
	}
	function getFestival(year, month, day) {
		for (var key in festivals) {
			if (key == String(month)+day) {
				return festivals[key];
			}
			var e2cObj = e2c(year, month, day);
			if (key == "c"+String(e2cObj.cm)+e2cObj.cd) {
				return festivals[key];
			}
		}
		return null;
	}
	
	function createMonthShowData(year, month, day) {
		utilDate.setFullYear(year, month, 1);

		var f_weekday = utilDate.getDay(); // 本月第一天是周几
		var f_weekmod = f_weekday % 7;

		var dis_day = "";

		var n_month = month+1>11 ? 0 : (month+1); // 下月
		var n_year = month+1>11 ? (year+1) : year; // 下月的年
		var l_monthday = monthDays[month];
		if (month==1 && isLeapYear(year)) {
			l_monthday++;
		}

		// 显示的总日期数(包括空日期)
		var total_riqi = f_weekmod + l_monthday;

		var arr = [];

		var i = 0;
		for (i=1; i<=f_weekmod; i++) {
			arr.push("&nbsp;");
		}
		for (; i<=total_riqi; i++) {
			dis_day = getFestival(year, month+1, i-f_weekmod);
			if (dis_day != null) {
				arr.push(dis_day);
				continue;
			} else {
				dis_day = i-f_weekmod;
			}
			if (year==today.getFullYear() && month==today.getMonth() && (i-f_weekmod)==today.getDate()) {
				arr.push("今天");
				continue;
			}
			arr.push(dis_day);
		}

		return arr;
	}

	var monthNum = 0;
	var maxMonthNum = 12;
	var maxDayNum = 0;
	var monthShowData = [];
	var selectDate = nextDay(today.getFullYear(), today.getMonth(), today.getDate(), 1);
	var selectDateInt = nextDay(today.getFullYear(), today.getMonth(), today.getDate(), 1);

	function init_cal() {
		setTimeout(function(){
			var nmt, todayFullYear=today.getFullYear(), todayMonth=today.getMonth();
			for (var i=0; i<maxMonthNum; i++) {
				nmt = nextMonth(todayFullYear, todayMonth, i);
				monthShowData[i] = createMonthShowData(nmt.getFullYear(), nmt.getMonth(), nmt.getDate());
			}
		}, 0);

		$('<div id="calendar"><div class="calendar_nr"><div class="calendar_title"><div class="month"><div class="before"></div></div><div class="month month_border"><div class="next"></div></div></div><div class="calendar_content"><div class="month_content paddingRight"><div class="week"><span class="orange">日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span class="orange">六</span></div><table cellpadding="0" cellspacing="0" border="0"></table></div><div class="month_content month_border paddingLeft"><div class="week month_pad"><span class="orange">日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span class="orange">六</span></div><table cellpadding="0" cellspacing="0" border="0"></table></div></div></div></div>').appendTo($("body")).click(function(){
			$("#calendar").show();
			return false;
		});

		$("#calendar .next").click(function(){
			empty_cal();
			cal_obj_list[cal_index_id]["monthNum"] += 1;
			fillCalendar(cal_obj_list[cal_index_id]["monthNum"]);
		});
		$("#calendar .before").click(function(){
			empty_cal();
			cal_obj_list[cal_index_id]["monthNum"] -= 1;
			fillCalendar(cal_obj_list[cal_index_id]["monthNum"]);
		});

		$(document).click(function(){
			cancel_cal();
		});
	}
	function empty_cal() {
		$(".month span").remove();
		$("#calendar table").empty();
	}
	function cancel_cal() {
		$("#calendar .month span").remove();
		$("#calendar table").empty();
		$("#calendar").hide();
	}
	function createMonthHtml(month_i) {
		var selectDateInt = cal_obj_list[cal_index_id]["selectDateInt"];
		var selectDate = selectDateInt;

		var str = new Array();
		str[str.length] = "<tr>";

		var month_obj = nextMonth(today.getFullYear(), today.getMonth(), month_i);
		var year = month_obj.getFullYear();
		var month = month_obj.getMonth();
		var f_weekday = month_obj.getDay();//本月第一天是周几
		var f_all_cnt = 0;
		for (var i in monthShowData[month_i]) {
			i = +i;
			f_all_cnt++;
			var day = i+1-f_weekday%7
			var dis_day = monthShowData[month_i][i];
			if (i%7==0 && i>0) {
				str[str.length] = "</tr><tr>";
			}
			if (dis_day != undefined) {
				if (dis_day=="&nbsp;"
						|| year<today.getFullYear()
						|| (year==today.getFullYear() && month<today.getMonth())
						|| (year==today.getFullYear() && month==today.getMonth() && day<today.getDate())
				) {
					str[str.length] = '<td>'+dis_day+'</td>';
				} else if (i%7==0 || (i+1)%7==0 || isNaN(dis_day)) {
					if (year==selectDate.getFullYear() && month==selectDate.getMonth() && day==selectDate.getDate()) {
						str[str.length] = '<td><a class="orange date_select" href="#" id=\"'+(i+1-f_weekday)+'\">'+dis_day+'</a></td>';
					} else {
						str[str.length] = '<td><a class="orange" href="#" id=\"'+(i+1-f_weekday)+'\">'+dis_day+'</a></td>';
					}
				} else {
					if (year==selectDate.getFullYear() && month==selectDate.getMonth() && day==selectDate.getDate()) {
						str[str.length] = '<td><a class="date_select" href="#" id=\"'+(i+1-f_weekday)+'\">'+dis_day+'</a></td>';
					} else {
						str[str.length] = '<td><a href="#" id=\"'+(i+1-f_weekday)+'\">'+dis_day+'</a></td>';
					}
				}
			}
		}

		if (f_all_cnt % 7 == 0) {
			str[str.length] = "</tr>";
		}

		var finalstr = str.join("");
		finalstr=finalstr.replace(/<tr><\/tr>/,"");
		finalstr=finalstr.replace(/<tr>$/,"");
		return finalstr;
	}
	function fillCalendar(month_i) {
		// before,next button hide
		if (month_i == 0) {
			$(".before").hide();
		} else {
			$(".before").show();
		}
		if (month_i == maxMonthNum-2) {
			$(".next").hide();
		} else {
			$(".next").show();
		}

		var month_obj = nextMonth(today.getFullYear(), today.getMonth(), month_i);

		var month = month_obj.getMonth();
		var year = month_obj.getFullYear();
		var n_month = month+1>11 ? 0 : month+1;//下月
		var n_year = month+1>11 ? year+1 : year;//下月的年

		$(".month").eq(0).append("<span>"+year+"年"+(month+1)+"月</span>");
		$(".month").eq(1).append("<span>"+n_year+"年"+(n_month+1)+"月</span>");

		var str = [];
		str[0] = createMonthHtml(month_i);

		var year = today.getFullYear();
		var month = today.getMonth();
		var date = today.getDate();
		var month_obj = nextMonth(year, month, month_i);

		// display month
		$("#calendar table").eq(0).append(str[0]);
		$(".paddingRight td a").click(function(){
			cal_obj_list[cal_index_id]["selectDateInt"].setFullYear(month_obj.getFullYear(),month_obj.getMonth(),$(this).attr("id"));
		});

		//next month
		var n_month_obj=nextMonth(year,month,month_i+1);
		str[1] = createMonthHtml(month_i+1);

		$("#calendar table").eq(1).append(str[1]);

		//background
		var tmplBg = $(".paddingRight table").css("background-image").replace(/url|"|'|\(|\)/g, '');
		
		
		
		$(".paddingRight table").css({"background":"url("+  tmplBg.replace(/\d+yue/g, ((month_obj.getMonth()+1)+"yue"))   +") no-repeat"});
		$(".paddingLeft table").css({"background":"url("+   tmplBg.replace(/\d+yue/g, ((n_month_obj.getMonth()+1)+"yue")) +") no-repeat"});
		
		$(".paddingLeft td a").click(function(){
			cal_obj_list[cal_index_id]["selectDateInt"].setFullYear(n_month_obj.getFullYear(), n_month_obj.getMonth(), $(this).attr("id"));
		});

		$("#calendar td a").each(function(){
			$(this).click(function(){
				$("#calendar").removeClass("chufa");
				$("#"+cal_input_id).focus();

				var str = cal_obj_list[cal_index_id]["selectDateInt"].getFullYear()
					+ "-"
					+ add0((cal_obj_list[cal_index_id]["selectDateInt"].getMonth()+1))
					+ "-"
					+ add0($(this).attr("id"));
				$("#"+cal_input_id).val(str);

				$.CPCAL.showTip(cal_obj_list[cal_index_id]["tipId"], cal_obj_list[cal_index_id]["selectDateInt"]);

				cancel_cal();

				return false;
			});
		});
	}

	$.CPCAL = {
		"init": function(){
			init_cal();			
		},
		"empty": function(){
			empty_cal();
		},
		"cancel": function(){
			cancel_cal();
		},
		"initDateStr": function(_offset){
			var selectDate = nextDay(today.getFullYear(), today.getMonth(), today.getDate(), _offset);
			return selectDate.getFullYear()
				+ "-" + add0(selectDate.getMonth()+1)
				+ "-" + add0(selectDate.getDate());
		},
		"genDateStr": function(_date){
			return _date.getFullYear()
				+ "-" + add0(_date.getMonth()+1)
				+ "-" + add0(_date.getDate());
		},
		"initCal": function(opts){
			for (var i=0; i<opts.length; i++) {
				$("#"+opts[i].id).cal(opts[i]);
			}
		},
		"showTip": function(_tipId, _date){
			var tip = getFestival(_date.getFullYear(), _date.getMonth()+1, _date.getDate());
			if (tip == null) {
				tip = "周"+weeks[_date.getDay()];
			}
			$("#"+_tipId).text(tip);
		},
		"calClick": function(eleid,idxid) {
			if ($.CPCAL.callBackFun && typeof $.CPCAL.callBackFun == "function") {
				$.CPCAL.callBackFun();
			}

			empty_cal();

			cal_input_id = eleid;
			cal_index_id = idxid;

			$("#"+eleid).focus();
			if ($.support.msie) {
				focusLast(document.getElementById(eleid));
			}

			if (!($("#calendar").css("display")=="block")) {
				$("#calendar").toggle();
			}

			var selectDate = cal_obj_list[idxid]["selectDateInt"];
			cal_obj_list[idxid]["monthNum"] = selectDate.getMonth() + (selectDate.getFullYear() - today.getFullYear()) * 12 - today.getMonth();

			var monthNum = cal_obj_list[idxid]["monthNum"];
			if (monthNum%2 == 1) {
				monthNum = monthNum-1;
				cal_obj_list[idxid]["monthNum"] -= 1;
			}

			if (monthNum == maxMonthNum-1) {
				monthNum--;
			} else if (monthNum == 1) {
				monthNum--;
			}

			fillCalendar(monthNum);

			if ($("#calendar").css("display") != "none") {
				var offset = $("#"+cal_input_id).offset();
				var calObjList = cal_obj_list[cal_index_id];
				$("#calendar").css({
					"left": offset.left + calObjList.offset_x,
					"top": offset.top + calObjList.offset_y
				});
			}
		},
		"callBackFun": undefined
	};

	var cal_input_id = "";
	var cal_index_id = "";
	var cal_obj_list = {};
	
	$.fn.cal = function(opt){
		var defaults = {
			id:"date",
			tipId:"date_tip",
			iconId:"date_icon",
			offset_x: -3,
			offset_y: 24,
			dayOffSet: 1,
			queryDate: null
		};

		if (opt) {
			opt = $.extend(defaults, opt);
		}
        
		var strTime = $('#'+opt.id).val();
		if (strTime!=""){
			opt.queryDate = new Date(Date.parse(strTime.replace(/-/g,   "/")));
		}
         

		this.each(function(index, element){
			var eleid = $(element).attr("id");
			var idxid = index+""+eleid;
			cal_obj_list[idxid]={};
			cal_obj_list[idxid]["tipId"] = opt.tipId;
			cal_obj_list[idxid]["monthNum"] = -1;
			cal_obj_list[idxid]["selectDate"] = opt.queryDate!=null ? nextDay(opt.queryDate.getFullYear(), opt.queryDate.getMonth(), opt.queryDate.getDate(), 0) : nextDay(today.getFullYear(), today.getMonth(), today.getDate(), opt.dayOffSet);
			cal_obj_list[idxid]["selectDateInt"] = opt.queryDate!=null ? nextDay(opt.queryDate.getFullYear(), opt.queryDate.getMonth(), opt.queryDate.getDate(), 0) : nextDay(today.getFullYear(), today.getMonth(), today.getDate(), opt.dayOffSet);
			$.CPCAL.showTip(opt.tipId, cal_obj_list[idxid]["selectDate"]);
			var dateStr = $.CPCAL.genDateStr(cal_obj_list[idxid]["selectDate"]);
			cal_obj_list[idxid] = $.extend(cal_obj_list[idxid], opt);
			$(element).val(dateStr).click(function(){
				$.CPCAL.calClick(eleid,idxid);
				return false;
			});
			$("#"+opt.tipId+",#"+opt.iconId).click(function(){
				$.CPCAL.calClick(eleid,idxid);
				return false;
			});
		});

		return this;
	}
})(jQuery);