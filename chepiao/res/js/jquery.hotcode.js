// ---------------------------------------------------------------------------------------------------------------------
ho = {};
ho.global  = {};
ho.loadDiv = {};
ho.isLoad  = false;
ho.close   = function() { $().hotCode.hoClose(); };
ho.charSelect = function(I){ $().hotCode.charSelect(I); };

// jQuery.hotCode From baidu hotCode
// ---------------------------------------------------------------------------------------------------------------------
(function($) {        
$.fn.hotCode = function(options) {
	
	// default options var 
	var defaults = {
		loadDivId: 'hotcode_float',
		    title: '热门车次',
			 note: '(可直接输入车次)',
	    cityArray: 'D321 K181 K586 T7 T201 D29 K2288 D3135 K1096 K1106 K390 K7726 K190 T69 T186 K155 T14 T61 T145 K9064 K921 T131 T238 T9 D3018 T169 T5 K356 K560 K1182'
	}; 
	
	// override options
	var opts = $.extend(defaults, options);
	
	// Div show
	var showDiv = function(e) {
		 e.stopPropagation(); 
		 ho.global  =  fetchCt($('#'+$(this).attr('src')));
		 hc.global.input.focus();
		 
		 // Determines if input is current. if so ! close it
		 if ( ho.global == false) return ;
		 
		 // set "hotCode_div_show" Position
		 $('.hotcity').parent().hide();
		 var M = $("#"+opts.loadDivId);
		 var P = fetchOffset(ho.global.position);
		 M.bgiframe(); //user jQuery Plugins bgiframe
		 M.show().css({"position":"absolute", "top":P._top+"px" ,"left":P._left+"px"});
	}
		
	// get "hotCode_div_show" offset
	 var fetchOffset = function(obj) {
		 var _top   =  obj.offset().top + obj.outerHeight(true); 
		 var _left  =  obj.offset().left;
		 return {_top:_top, _left:_left};
	
	}
	 
	// Object Ct global
	var fetchCt = function(obj) {
		var input  =  obj;
		var position  = obj;
		return {input: input, position:position};
	}
	
	// IS IE
	var isIE = function() {
	   return (navigator.userAgent.indexOf("MSIE") > -1)? true : false;	
	}
	
	// init Movie
	var init = function() {
		html = ' <div id="'+opts.loadDivId+'"></div>';
		$("body").append(html);
	}
	
	// load Movie
	var loadMovie = function() {
		html = ' <div class="hotcity">'
	         + ' <div class="hotcity_head">'
			 + ' <span>'+opts.title+'</span>'
			 + ' <span>'+opts.note+'</span>'
			 + ' <div class="close" title="关闭"></div>'
			 + ' </div>'
			 + ' <div class="content">'
			 + ' <table cellpadding="0" cellspacing="0" border="0"><tr><td>'
			 + ' <ul>';

		  var StrArray= opts.cityArray.split(" ");
		  for ( var i=0; i < StrArray.length; i++){
			  html += ' <li onMouseOver="this.style.backgroundColor=\'#C5E7F6\'" onMouseOut="this.style.backgroundColor=\'\'"' 
			       + ' onClick="JavaScript:ho.charSelect(\''+StrArray[i]+'\')">'+ StrArray[i]+'</li>';
		 }
		 html +='</ul>';
		 html +='</td></tr></table></div>';
		 html +='</div>';
		 // Movie
		$("#"+opts.loadDivId).html(html);  
	}
	// --init load hotCode ---------
	init();
	loadMovie();		 
	ho.isLoad  = true;
	ho.loadDiv = $("#"+opts.loadDivId);
	// Bind Evernt
	$(this).bind('click',showDiv);
	
	// document onclick close
	$(document).click(function(e){
		// If firefox return null;
		if (e.target.tagName.toLowerCase() == 'embed') return ;
		$().hotCode.hoClose();
	});
	return this;
};

// Ct Flash Object charSelect
$.fn.hotCode.charSelect = function(I) {
	ho.global.input.val( I )
};

// "hotCode_div_show" close
$.fn.hotCode.hoClose = function() {
    if ( ho.isLoad == true) {
		  ho.global  = {};
	      ho.loadDiv.css({"top": " -1000px" ,"left": "-1000px"});
    }
};
})(jQuery);
// ---------------------------------------------------------------------------------------------------------------------

// use Plugins JQuery.bgIframe
// ---------------------------------------------------------------------------------------------------------------------
(function($){
	$.fn.bgiframe = ($.support.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
		s = $.extend({
			top     : 'auto', // auto == .currentStyle.borderTopWidth
			left    : 'auto', // auto == .currentStyle.borderLeftWidth
			width   : 'auto', // auto == offsetWidth
			height  : 'auto', // auto == offsetHeight
			opacity : true,
			src     : 'javascript:false;'
		}, s);
		var html = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="'+s.src+'"'
			+ ' style="display:block;position:absolute;z-index:-1; '
			+ (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');':'')
			+ 'top:'+(s.top=='auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';'
			+ 'left:'+(s.left=='auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';'
			+ 'width:'+(s.width=='auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';'
			+ 'height:'+(s.height=='auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';'
			+ '"/>';
		return this.each(function() {
			if ($(this).children('iframe.bgiframe').length === 0)
				this.insertBefore(document.createElement(html), this.firstChild);
		});
	} : function(){return this;});

	// old alias
	$.fn.bgIframe = $.fn.bgiframe;

	function prop(n) {
		return n && n.constructor === Number ? n + 'px' : n;
	}
})(jQuery);
// ---------------------------------------------------------------------------------------------------------------------