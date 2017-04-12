/* UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

http://htmlpluscss.ru

*/


(function($){

	$('.alert_up__textarea').each(function(){
		var t = $(this),
			h = t.outerHeight();
		t.siblings('.alert_up__textarea-arrow').draggable({
			axis: "y",
			drag: function(event, ui) {
				if(ui.position.top < h){
					ui.position.top = h;
				}
				t.height(ui.position.top - 10);
			}
		});
	});

	$('.file-logo__mask i').draggable({
		axis: "x",
		drag: function(event, ui) {
			if(ui.position.left < -25){
				ui.position.left = -25;
			}
			if(ui.position.left > 0){
				ui.position.left = 0;
			}
		},
		start: function(event, ui) {
			$('.file-logo__img').addClass('file-logo__img--active');
		},
		stop: function(event, ui) {
			$('.file-logo__img--active').removeClass('file-logo__img--active');
			$('.file-logo input[name="file-logo-left"]').val(ui.position.left);
		}
	});

	$('.lk-box__list-edit__remove').on('click',function(){
		$(this).closest('.lk-box__list-edit__item').fadeOut(function(){
			$(this).remove();
		});
	});

})(jQuery);