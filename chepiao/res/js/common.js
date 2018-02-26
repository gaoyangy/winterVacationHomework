// 重置和选择框
var doRest = function()
{
    $('input[type="text"]').val('');
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

// 余票
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