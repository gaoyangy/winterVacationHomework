
// 重置和选择框
var doRest = function()
{
    $('input[type="text"]').val('');
}

// 提交前判断
// 1. 余票
var doRemain = function()
{
    var startStation  = $('#startStation').val();
	var arriveStation = $('#arriveStation').val();
	var date          = $('#date').val();
	
	if ( startStation == "")
	{
	   $('#startStation').focus();
	   $('#startStation').addClass('error');
	   return
	}
	$('#startStation').removeClass('error');
	
	if ( arriveStation == "")
	{
	   $('#arriveStation').focus();
	   $('#arriveStation').addClass('error');
	   return
	}
	$('#arriveStation').removeClass('error');
	
	if ( date == "")
	{
	   $('#date').addClass('error');
	   $('#date').focus();
	   return
	}
	$('#date').removeClass('error');
	
	// var action = BaseURL + 'yupiao/'+encodeURIComponent(startStation)+','+encodeURIComponent(arriveStation)+','+date+'.html';
	// $('#sub_form').attr('method', 'post');
	// $('#sub_form').attr('action', action);
	$('#sub_form').submit();
	$(".loading").show();
}

// 2. 车次查询
var doCode = function()
{
    var trainCode  = $('#trainCode').val();
	var date       = $('#date').val();
	
	if ( trainCode == "")
	{
	   $('#trainCode').focus();
	   $('#trainCode').addClass('error');
	   return
	}
	$('#trainCode').removeClass('error');
	
	if ( date == "")
	{
	   $('#date').addClass('error');
	   $('#date').focus();
	   return
	}
	$('#date').removeClass('error');
	
	var action = BaseURL + 'checi/'+trainCode+','+date+'.html';
	$('#sub_form').attr('method', 'post');
	$('#sub_form').attr('action', action);
	$('#sub_form').submit();
	$(".loading").show();
}

// 3. 火车车站
var doStation = function()
{
    var stationName = $('#stationName').val();
	var date        = $('#date').val();
	
	if ( stationName == "")
	{
	   $('#stationName').focus();
	   $('#stationName').addClass('error');
	   return
	}
	$('#stationName').removeClass('error');
	
	if ( date == "")
	{
	   $('#date').addClass('error');
	   $('#date').focus();
	   return
	}
	$('#date').removeClass('error');
	
	var action = BaseURL + 'chezhan/'+encodeURIComponent(stationName)+','+date+'.html';
	$('#sub_form').attr('method', 'post');
	$('#sub_form').attr('action', action);
	$('#sub_form').submit();
	$(".loading").show();
}
// 初始化加载
$(function(){
	// 站点框
	$(".hotip").hotCity();
	$(".hotcc").hotCode();	
		
	// 显示车次详细
	$(".items").find('.more').toggle(
	    function(){
		    do_code_info_load($(this));
			$(this).addClass('more2');
		},
		function(){
		    $(this).parents('li').find('.code_list').remove();
			$(this).removeClass('more2');
		}
	);
		
    // 日期框
    $(".detip").datapick();
	
	// 自动提示-- 车站
	$(".station").each(function(){
        auto_complete($(this), 'station');							
	});
	// 自动提示-- 车次
    $(".code").each(function(){
        auto_complete($(this), 'code');							
	});
	// 两站互换
	$(".change").click(function(){
	    var sta_0 = $(".station").eq(0).val();
		var sta_1 = $(".station").eq(1).val();
		$(".station").eq(0).val(sta_1);
		$(".station").eq(1).val(sta_0);
		
		var pla_0 = $(".plane").eq(0).val();
		var pla_1 = $(".plane").eq(1).val();
		$(".plane").eq(0).val(pla_1);
		$(".plane").eq(1).val(pla_0);
		
	}).mouseover(function(){
	    $(this).addClass('chahon'); 
	}).mouseout(function(){
	    $(this).removeClass('chahon');
	});
	
	// 表格选择排序
	$("#tableSort").tableSort();
});

// 车次信息加载
var do_code_info_load = function(obj)
{
    var code = obj.attr('code');
	var base = obj.parents('li');
	var url  = BaseURL+'checi/'+code+'?act=ajax';
	$('<div class="loading"></div>').appendTo(base);
	$.post(url, function(html){
	    base.append(html);
	});
	base.find('.loading').remove();
}

// 车次信息关闭
var do_code_info_hide = function(obj)
{
    $(obj).parents('li').find('.more').click();
}

// 自动提示
var auto_complete = function(obj, act)
{
    var url = BaseURL+'auto?act='+act+'&'+Math.random()*1000;
	obj.autocomplete(url, {
    minChars: 0,
	width: 200,
	max: 150,
	scrollHeight: 300,
	matchContains: true,
	autoFill: false,
	multiple: false,
	dataType: "json",
	parse: function(data) {
		return $.map(data, function(row) {
			return {
	 			data: row,
				value: row.name,
				result: row.name
				}
			});
	},
	formatItem: function(item) {
		return item.name + '(' + item.code + ')';
	}
    }).result(function(event, data, formatted) {
	    $(".loading").hide();
  });
}
