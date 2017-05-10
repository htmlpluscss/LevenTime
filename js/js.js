/* UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

http://htmlpluscss.ru

*/

var leventimeDOM = {};

(function($){

	var windowHeight,
		windowScrollTop,
		resizeTimeoutId,
		body = $('body'),
		$window = $(window),
		h1 = $('.h1'),
		parallax = $('.app-download__parallax'),
		parallaxImg = parallax.children(),
		parallaxTop,
		parallaxDelta,
		parallaxImgTop,
		parallaxHeight;

	$window.on({
		resize: function(){
			clearTimeout(resizeTimeoutId);
			resizeTimeoutId = setTimeout(function(){
				pageResize();
			}, 100);
		},
		load: function(){
		// scroll-pane
			if($('.scroll-pane').length>0){
				$('.scroll-pane').jScrollPane();
			}
		},
		scroll: function(){
			windowScrollTop = $window.scrollTop();

			// h1
			h1.each(function(){
				var t = $(this),
					lineWidth,
					tTop = t.offset().top,
					line = t.children('.h1__line'),
					maxWidth = t.children('.h1__text').width();

				if(windowScrollTop + windowHeight > tTop && windowScrollTop < tTop){

					lineWidth = (tTop - windowScrollTop) / windowHeight;

					if(lineWidth > .5){

						lineWidth = 1 - lineWidth;

					}

					lineWidth *= maxWidth * 2;

					if(lineWidth < 20){
						lineWidth = 20;
					}
					else if(lineWidth > maxWidth){
						lineWidth = maxWidth;
					}

					line.width(lineWidth);
				}

			});

			// parallax
			if(parallax.length>0){

				parallaxImgTop = parallaxTop + parallaxHeight - windowScrollTop;
				parallaxImgTop /= parallaxDelta;
// %			parallaxImgTop = 100 * (1 - parallaxImgTop);
				parallaxImgTop = (637 - 506) * (1 - parallaxImgTop);

				if(parallaxTop > windowScrollTop + windowHeight){
					parallaxImgTop = 0;
				}
				else if (parallaxTop + parallaxHeight < windowScrollTop){
					parallaxImgTop = 100;
				}

				parallaxImg.css('transform', 'translateY(-' + parallaxImgTop + 'px)');

			}

		}
	});

	function pageResize(){
		windowHeight = $window.height();

		if(parallax.length>0){
			parallaxTop = parallax.offset().top;
			parallaxHeight = parallax.height();
			parallaxDelta = parallaxHeight;
			parallaxDelta +=  parallaxTop < windowHeight ? parallaxTop : windowHeight;
		}
	}
	pageResize();

	$window.trigger('scroll');

// h1
	h1.addClass('h1--line').wrapInner('<span class="h1__text">').append('<i class="h1__line"></i>');


// slideShow

	$.fn.slideShow = function(){

		var setSlider = function(){

			var slider = $(this),
				list = slider.find('.slide-show__item'),
				size = list.length,
				navNext = $('<a class="slide-show__next">'),
				navPrev = $('<a class="slide-show__prev">'),
				abscissa = slider.hasClass('slide-show--abscissa'),
				transition = false,
				intervalID;

			navNext.html('<i class="ico ico--arrow-right"></i>');
			navPrev.html('<i class="ico ico--arrow-left"></i>');

			leventimeDOM.sliderAddItem = function() {

				list = slider.find('.slide-show__item');
				size = list.length;
				slider.toggleClass('slide-show--hide-btn', size < 4);

				list.find('.slider-lk__img').each(function(){
					var src = $(this).attr('src');
					$(this).parent().css('background-image','url('+src+')');
				});

				list.find('.slider-lk__set-main').off().on('click',function(){
					$('.slider-lk__item--main').removeClass('slider-lk__item--main');
					$(this).closest('.slider-lk__item').addClass('slider-lk__item--main');
				});

				list.find('.slider-lk__del-item').one('click',function(){
					$(this).closest('.slide-show__item').fadeOut(function(){
						if($(this).index() > size - 4){
							navPrev.trigger('click');
						}
						$(this).remove();
						leventimeDOM.sliderAddItem();
					});
				});

			}

			navNext.add(navPrev).on('click',function(event,nextItemIndex){
				if(transition) {
					return true;
				}
				transition = true;

				var clickRight = $(this).hasClass('slide-show__next');
				var activeItem = list.filter('.slide-show__item--active');
				var nextItem = clickRight ? activeItem.next() : activeItem.prev();

				if(abscissa) {

					if(nextItem.index() > size - 3 || nextItem.length == 0){
						transition = false;
						return true;
					}
					nextActive(nextItem);
					ul.css('left',-nextItem.position().left).one(cssAnimation('transition'), function(){
						transition = false;
					});

				} else {

					if(clickRight){
						slider.addClass('slide-show--right');
						if(nextItem.length == 0){
							nextItem = list.first();
						}
					}
					else {
						slider.addClass('slide-show--left');
						if(nextItem.length == 0){
							nextItem = list.last();
						}
					}
					if(nextItemIndex !== undefined)
						nextItem = list.eq(nextItemIndex);
					nextItem.addClass('slide-show__item--next').one(cssAnimation('animation'), function(){
						nextActive(nextItem);
						list.removeClass('slide-show__item--next');
						slider.removeClass('slide-show--left slide-show--right');
						transition = false;
					});
					navDisk.removeClass('slide-show__marker--current').eq(nextItem.index()).addClass('slide-show__marker--current');

				}
			}).hover(function(){
				slider.addClass('notsel');
			},function(){
				slider.removeClass('notsel');
			});

			if(abscissa) {

				var ul = slider.find('.slide-show__ul');
				list.first().addClass('slide-show__item--active');
				leventimeDOM.sliderAddItem();

			} else {

				var nav = $('<div class="slide-show__nav">');
				for(var i = 0; i < size; i++){
					nav.append('<a class="slide-show__marker"></a>');
				}
				var navDisk = nav.children();

				navDisk.on('click',function(){
					if($(this).hasClass('slide-show__marker--current')) {
						return true;
					}
					var index = $(this).index();
					var btnClick = index > list.filter('.slide-show__item--active').index() ? navNext : navPrev;
					btnClick.trigger('click',index);
				});

				list.filter('.slide-show__item--active').length > 0 ?
					navDisk.eq(list.filter('.slide-show__item--active').index()).addClass('slide-show__marker--current') :
					navDisk.first().trigger('click');

				touchX(slider,navNext,navPrev);
				slider.append(nav);

			}

			slider.append(navNext,navPrev);

			function nextActive(n){
				n.addClass('slide-show__item--active').siblings().removeClass('slide-show__item--active');
			}

			function timer(time){
				slider.on('mouseleave mousemove touchstart touchmove touchend', function(event){
					clearInterval(intervalID);
					if(event.type == 'mousemove' && $(event.target).closest('a').length>0){
						return;
					}
					intervalID = setInterval(function(){
						navNext.triggerHandler('click');
					}, time);
				}).trigger('touchend');
			}
			if(slider.is('[data-timer]')){
				timer(parseInt(slider.attr('data-timer')) * 1000);
			}

		}

		return this.each(setSlider);

	};

	$('.slide-show').not('.slide-show--off').slideShow();

// touch X
	function touchX(b,l,r){
		var xStart, yStart, xEnd, yEnd;
		b.on('touchstart touchmove touchend',function(event){
			if (event.type == 'touchstart') {
				xEnd = 0;
				yEnd = 0;
				xStart = parseInt(event.originalEvent.touches[0].clientX);
				yStart = parseInt(event.originalEvent.touches[0].clientY);
			}
			if (event.type == 'touchmove') {
				xEnd = parseInt(event.originalEvent.touches[0].clientX);
				yEnd = parseInt(event.originalEvent.touches[0].clientY);
			}
			if (event.type == 'touchend') {
				if(xEnd == 0) {
					xStart * 2 > windowWidth ?
						l.trigger('click'):
						r.trigger('click');
				}
				else if (Math.abs(xStart - xEnd) > 50 && Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd)) {
					xStart > xEnd ?
						l.trigger('click'):
						r.trigger('click');
				}
			}
		});
	}

// alert_up
	$.fn.alertUp = function(){

		var box = $('.alert_up'),
			item = box.find('.alert_up__item');

		var scroolbar = $('<div class="scroolbar">'),
			scroolbarItem = $('<div class="scroolbar__item">');
		scroolbar.html(scroolbarItem);
		body.append(scroolbar);
		var scroolbarWidth = scroolbar.width() - scroolbarItem.width();
		scroolbar.remove();
		if(scroolbarWidth > 0){
			var style = $('<style>');
			style.html('.scroolbarwidth{margin-left:-'+scroolbarWidth+'px}');
			box.append(style);
		}

		box.on('click',function(event){
			var t = $(event.target);
			if(t.is('.alert_up') || t.is('.alert_up__close')){
				item.addClass('hide').find('.input--clear').val('');
				body.removeClass('hidden alert_up-show scroolbarwidth');
			}
		});

		box.on('touchmove mousewheel DOMMouseScroll', function (e) {
			var e0 = e.originalEvent,
			delta = e0.wheelDelta || -e0.detail;
			this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
			e.preventDefault();
		});

		leventimeDOM.showAlertHeightItem = function () {
			body.toggleClass('scroolbarwidth', windowHeight < body.height());
		}

		leventimeDOM.showAlertUp = function (selector) {
			var itemActive = item.filter('.alert_up__item--'+selector);
			body.addClass('hidden alert_up-show');
			leventimeDOM.showAlertHeightItem();
			item.not(itemActive).addClass('hide');
			itemActive.removeClass('hide').focus();
		}

		$window.on('keydown',function(e){
			if(e.which == 27){
				box.trigger('click');
			}
		});

		return this.each(function(){
			var selector = $(this).attr('data-alert-up');
			$(this).on('click',function(){
				leventimeDOM.showAlertUp(selector);
			});
		});

	};

	$('[data-alert-up]').alertUp();

// form-login
	$('.form-login .input').on('focus',function(){
		$(this).siblings('.input-box__error').addClass('hide');
	});


// tooltip
	$('.tooltip').each(function(){
		var t = $(this).addClass('notsel');
		var box = $('<span>');
		box.text(t.text());
		t.html(box);
	}).on('touchstart',function(){
		return false;
	});

// cssAnimation('animation/transition')
function cssAnimation(a){var b,c,d=document.createElement("cssanimation");switch(a){case'animation':b={"animation":"animationend","OAnimation":"oAnimationEnd","MozAnimation":"animationend","WebkitAnimation":"webkitAnimationEnd"};break;case'transition':b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"}}for(c in b)if(d.style[c]!==undefined)return b[c]};

})(jQuery);