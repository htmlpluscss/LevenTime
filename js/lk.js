/* UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

http://htmlpluscss.ru

*/


(function($){

// slider
	$('.slider-lk__img').each(function(){
		var src = $(this).attr('src');
		$(this).parent().css('background-image','url('+src+')');
	});

	$('.slider-lk__set-main').on('click',function(){
		$('.slider-lk__item--main').removeClass('slider-lk__item--main');
		$(this).closest('.slider-lk__item').addClass('slider-lk__item--main');
	});


})(jQuery);