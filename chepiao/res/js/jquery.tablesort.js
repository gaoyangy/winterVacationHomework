// ---------------------------------------------------------------------------------------------------------------------
(function($) {        
$.fn.tableSort = function(options) {
    
	// default options var 
	var defaults = {
		select: 'trainGrade startTime seatType startType endTime startStation arriveStation',
		  sort: 'trainCode startTime endTime'
	}; 
	
	// override options
	var opts = $.extend(defaults, options);
    if (typeof($(this).html()) == 'undefined') return this;

    // create box object
	var __select  = $(this).find('[box="select"]');
	var __head    = $(this).find('[box="head"]');
	var __items   = $(this).find('[box="items"]');
	var __conbar  = $(this).find('[box="conbar"]');
	
	// show & hide more
	__conbar.find('.more').toggle(
	    function(){
		    $(this).addClass('more2');
			__select.find('.hide').show();
		},
		function(){
		    $(this).removeClass('more2');
			__select.find('.hide').hide();
		}
	);
	
	// do clear
	__conbar.find('.clean').click(
	    function(){
			__select.find('input[type=checkbox]').attr('checked', false);
			$(this).hide();
		    do_select(__select, __items, $(this));
		}							  
	);
	
	// append fixed div
	$('<div class="head fixed" box="fixed">'+__head.html()+'</div>').appendTo($(this));
    var __fixed  = $(this).find('[box="fixed"]');

    // fixed table head
	$(window).scroll(function(){
		var top = __head.offset().top;
		var scrolls = $(this).scrollTop(); 
		if (scrolls > top){
			__fixed.width( __head.width());
		    __fixed.show();
		} else {
		   __fixed.hide();
		}
	})
	
	$(window).resize(function(){
		var top = __head.offset().top;
		var scrolls = $(this).scrollTop(); 
		if (scrolls > top){
			__fixed.width( __head.width() );
		    __fixed.show();
		} else {
		    __fixed.hide();
		}
	})

    // create sort filed
	var select_sort = opts.select.split(' ');
	var sort_sort   = opts.sort.split(' ');

    // set head click
	__head.find('[sort]').each(function(){
        $(this).addClass('head_sort').toggle(
		   function(){
			   __head.find('[sort]').removeClass('head_desc').removeClass('head_asc');
			   $(this).addClass('head_desc').removeClass('head_asc'); 
			   do_sort(__items, $(this));
		   },
		   function(){
			   __head.find('[sort]').removeClass('head_desc').removeClass('head_asc');
			   $(this).addClass('head_asc').removeClass('head_desc');
			   do_sort(__items, $(this));
			}
		).mouseover(function(){
		    $(this).addClass('head_over');
		}).mouseout(function(){
		    $(this).removeClass('head_over');
		});
	});

    // set select click
	__select.find('[name]').each(function(){
	    if ( "" == $(this).val()) // 如果全选操作
		{
			var name = $(this).attr('name');
			$(this).toggle(
				function(){
					$(this).addClass('seled');
					__select.find('input[name="'+name+'"]').attr('checked', true);
				},
				function(){
					$(this).removeClass('seled');
					__select.find('input[name="'+name+'"]').attr('checked', false);
				}
			);
		} 									  
										  							  
        $(this).click(function(){
			do_select(__select, __items, $(this));
			__conbar.find('.clean').show();
		});
	});


    // Do select click
	var do_select = function(select, items, obj)
	{
		var seledArray = new Array();
		for (var i = 0; i < select_sort.length; i++) 
		{
			seledArray[i] = new Array();
			seledArray[i][1] = select_sort[i];
			seledArray[i][2] = get_checked(select, select_sort[i]);	
		}
		
		var itemBodys  = items.find('[box]');
		for (var i = 0; i < itemBodys.length; i++) 
		{
			var tempFlag = true;
			for (var k = 0; k < seledArray.length; k++)
			{
			    var value = $(itemBodys[i]).find('[sort="'+seledArray[k][1]+'"]').text();
				var flags = chk_hide($.trim(value), seledArray[k][2]);
				tempFlag  = tempFlag && flags;
			}
            if (true == tempFlag){
			    $(itemBodys[i]).show();
			} else {
			    $(itemBodys[i]).hide();
			}
		}
	}

    // Do hide item
	var chk_hide = function(val, seled)
	{
	    if ( seled.length == 0) return true;
		
		var returnFlag = false;
		for (var i = 0; i < seled.length; i++)
		{
			var tmpArr  = seled[i].split(',');
			for (var k = 0; k < tmpArr.length; k++)
			{
				var lastFlag = true;
				var tmpLast = tmpArr[k].split('&&');
				for (var j = 0; j < tmpLast.length; j++)
				{
		            var resFlag = chk_element(val, tmpLast[j]);
				    lastFlag = lastFlag && resFlag;
				}
				returnFlag = returnFlag || lastFlag;
			}
		}
		return returnFlag;
	}

    // Selected Array element check boole
	var chk_element = function(val, chk)
	{
	    opt = chk.substr(0, 2);
		chk = chk.substr(2, chk.length-2);
		val = val.replace(/\s+/g, '');
		
		switch(opt)
		{
		    case '>>':
			return val > chk;
			break;
			
			case '>=':
			return val >= chk;
			break;
			
			case '<<':
			return val < chk;
			break;
			
			case '<=':
			return val <= chk;
			break;
			
			case '<>':
			return val.indexOf(chk) != -1;
			break;
			
			default:
			return val == chk;
			break;
		}
	}

    // Get checked checkbox
	var get_checked = function(select, name)
	{
	   var selArray = select.find('input[name="'+name+'"]');
	   
	   var retArray = new Array();
	   for (var i = 0; i < selArray.length; i++)
	   {
		   if ( $(selArray[i]).attr('checked') == 'checked')
		   {
		       retArray[retArray.length] = $(selArray[i]).val();
		   }
	   }
	   return retArray;
	}

    // Do head sort
    var do_sort = function(items, obj)
	{
		var sortString = obj.attr('sort');
	    var sortValue  = new Array(); 
		var itemBodys  = items.find('[box]');
		for (var i = 0; i < itemBodys.length; i++) 
		{
			sortValue[i] = new Array(); 
            sortValue[i][1] = $(itemBodys[i]).find('[sort="'+sortString+'"]').html();
            sortValue[i][2] = $(itemBodys[i]).html();
            $(itemBodys[i]).html('');
		}
		
		var sortIndex = items.data('this');
		var lengIndex = sortValue.length;
		if (sortString == sortIndex) 
		{
			sortValue.reverse();
		} else {
            sortValue.sort(createCompact());
        }
        
		for (var i = 0; i < lengIndex; i++) {
            $(itemBodys[i]).html(sortValue[i][2]);
		}
        
		items.data('this', sortString);
	}

    // Do compact value
    var createCompact = function (styType) 
	{
        return function (object1, object2) {
            var value1 = object1[1];
            var value2 = object2[1];

            if (value1 < value2) {
                return -1;
            } else if (value1 > value2) {
                return 1;
            } else {
                return 0;
            } 
         }
      }

    // return object
	return this;
}
})(jQuery);