$(document).ready(function(){

    $('<p id="back-top" class="back-top"><a class="bg top" title="返回顶部"></a></p>').appendTo('body,html');
	var _left = $('.main-in').offset().left + $('.main-in').width() + 35;
	$('#back-top').css('margin-left', _left);
	
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').show();
			} else {
				$('#back-top').hide();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});
