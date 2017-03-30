/* UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

http://htmlpluscss.ru

*/

rapicreditDOM = {};


/*

rapicreditDOM.windowScrollTop // скролл страницы
rapicreditDOM.select(element) // стилизуем select-ы, кидаем набор или элемент


*/

(function($){

	var windowWidth,
		windowHeight,
		resizeTimeoutId,
		body = $('body'),
		main = $('.main'),
		$window = $(window);

	$window.on({
		resize: function(){
			clearTimeout(resizeTimeoutId);
			resizeTimeoutId = setTimeout(function(){
				pageResize();
			}, 100);
		},
		scroll: function(){
			rapicreditDOM.windowScrollTop = $window.scrollTop();
		}
	});

	function pageResize(){
		windowWidth = $window.width();
		windowHeight = $window.height();
	}
	pageResize();

	$window.trigger('scroll');

// lang menu
	$('.lang-toggle-show').on('click',function(){
		$('.lang-toggle').addClass('lang-toggle--hover');
		$window.on('click.langToggle',function(e){
			if(!$(e.target).hasClass('lang-toggle-show')){
				$('.lang-toggle').removeClass('lang-toggle--hover');
				$window.off('click.langToggle');
			}
		});
	});

// submenu show
	$('.header__menu-toggle').on('click',function(){
		$('.header__menu-toggle').addClass('header__menu-toggle--hover');
		$window.on('click.headerMenuToggle',function(e){
			if(!$(e.target).hasClass('header__menu-toggle')){
				$('.header__menu-toggle').removeClass('header__menu-toggle--hover');
				$window.off('click.headerMenuToggle');
			}
		});
	});

// menu modile
	$('.menu-mobile-toggle').on('click',function(e){
		e.stopPropagation();
		body.toggleClass('menu-mobile-show');
		$('.menu-mobile').focus();
	});

//select
	rapicreditDOM.select = function(selector){

		$(selector).selectric({
			arrowButtonMarkup: '<i class="button"></i>',
		});

	}
	if ($('select').length>0) {
		rapicreditDOM.select('select');
	}

// content-sidebar
	$('.content-sidebar__goto').on('click',function(event,ancor){
		var index = $(this).parent().index();
		var next = $('.content-sidebar__content').children().eq(index);
		$(this).parent().addClass('content-sidebar__sidebar-item--active')
			.siblings().removeClass('content-sidebar__sidebar-item--active');
		next.addClass('content-sidebar__content-item--active')
			.siblings().removeClass('content-sidebar__content-item--active');
		if (ancor !== undefined){
			location.hash = $(this).attr('href');
		}
	});

// faq
	(function(faq){

		if(faq.length==0) return;

		var question = $('.faq__question'),
			sidebar = $('<div class="content-sidebar__sidebar">'),
			content = $('<div class="content-sidebar__content">');

		$('.faq__box').append(sidebar,content);
		sidebar.html($('.content-sidebar__sidebar-item'));
		content.html($('.content-sidebar__content-item'));

		question.on('click',function(event){
			question.not($(this)).removeClass('faq__question--active');
			$(this).toggleClass('faq__question--active');
			location.hash = $(this).children().attr('href');
		});

	// faq ancor
		var ankor = window.location.href.split('#')[1];
		if (ankor !== undefined) {
			var el = $('#'+ankor);
			if(el.hasClass('faq__item')){
				var index = el.parent().index();
				$('.content-sidebar__goto').eq(index).trigger('click');
				el.children('.faq__question').trigger('click');
				$('.faq__item').removeAttr('id');
			}
			if(el.hasClass('content-sidebar__content-item')){
				var index = el.index();
				$('.content-sidebar__goto').eq(index).trigger('click',ankor);
			}
		}
		else {
			$('.content-sidebar__goto').first().trigger('click');
		}

	})($('.faq'));

// attachment
	$('.attachment__input').on('change',function(){
		$(this).closest('.attachment').toggleClass('attachment--active',$(this).val()!='')
			.find('.attachment__value').text($(this).val());
	});
	$('.attachment__delete').on('click',function(){
		$(this).closest('.attachment').find('.attachment__input').val('').trigger('change');
	});


})(jQuery);