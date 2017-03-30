/* UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

http://htmlpluscss.ru

*/


(function($){

	var windowHeight,
		windowScrollTop,
		resizeTimeoutId,
		body = $('body'),
		$window = $(window);

	$window.on({
		resize: function(){
			clearTimeout(resizeTimeoutId);
			resizeTimeoutId = setTimeout(function(){
				pageResize();
			}, 100);
		},
		scroll: function(){
			windowScrollTop = $window.scrollTop();
		}
	});

	function pageResize(){
		windowHeight = $window.height();
	}
	pageResize();

	$window.trigger('scroll');

















})(jQuery);