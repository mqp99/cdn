$(function () {
	/** Variable default here */
	var times;
	var count = 1;
	var _body = $('body');
	var _button = $('button');

	/** Variable Navbar here */
	var _navbar = $('.navbar');
	var _navMenu = $('.navbar-menu');
	var _menuDrop = $('.menu-drop');
	var _menuLink = $('.navbar-menu li');

	/** Variable toggle button */
	var _btnMenu = $(`[data-toggle='toggle-menu']`);
	var _btnEffect = $(`button[class*='effect']`);
	var _btnRipple = $(`[data-ripple='true']`);

	/** Variable scroll here */
	var lastScrollTop = 0;
	var navHeight = $('.navbar').outerHeight();


	/** WHEN MENU drop CLICK | open submenu */
	_menuDrop.on('click', function toggleMenuDrop() {
		$(this).siblings().removeClass('open');
		$(this).toggleClass('open');
	})

	/** WHEN MENU Link CLICK | active link this */
	_menuLink.on('click', function toggleActiveMenu() {
		_menuLink.removeClass('active');
		$(this).toggleClass('active')
	})

	/** WHEN BUTTON open menu CLICK | active navbar-menu */
	_btnMenu.on('click', function toggleMenu() {
		// Toggle menu
		_navMenu.toggleClass('open');
		$(this).toggleClass('open');
	})

	/** WHEN BUTTON effect CLICK | active animation */
	_btnEffect.on('click', function toggleEffect() {
		$(this).addClass('animation');
		setTimeout(() => { _button.removeClass('animation') }, 500);
	})

	/** WHEN BUTTON ripple CLICK | active ripple */
	_btnRipple.on('click', function toggleRipple(e) {
		let x = $(window).scrollLeft() - $(this).offset().left + e.clientX;
		let y = $(window).scrollTop() - $(this).offset().top + e.clientY;

		let ripples = $(this).append(`
			<div class='ripple' style='left: ${x}px; top: ${y}px;'></div>
		`);

		setTimeout(() => {
			$(this).find('div:first').remove();
		}, 900)
	})

	$.fn.extend({
		navbarConfig: function(config) {
		    return this.each(function(){
				try {
			    	var navbarFixed = config.navbarFixed;
					var navbarFullHeight = config.navbarFullHeight;
					var navbarShowOnScroll = config.navbarShowOnScroll;
			    	var navbarBackground = config.navbarBackground;
			    	var navbarSize = config.navbarSize;

			    	if(navbarBackground == 'light') {
			    		_navbar.addClass('navbar-light')
			    	}else if(navbarBackground == 'dark') {
			    		_navbar.addClass('navbar-dark')
			    	}else if(navbarBackground == 'black') {
			    		_navbar.addClass('navbar-black')
			    	}

			    	if(navbarSize == 'sm') {
			    		_navbar.addClass('navbar-size-sm')
			    	}else if(navbarSize == 'lg') {
			    		_navbar.addClass('navbar-size-lg')
			    	}

					if(navbarFullHeight) {
						_navMenu.addClass('fullheight')
					}else{
						_navMenu.removeClass('fullheight');
					}

					$(window).on('scroll', function scrollNavbar() {

						var scrollTop = $(document).scrollTop();

						// If @data[showonscroll] is turn on
						if (navbarShowOnScroll) {

							/** If scroll < navbar */
							if (scrollTop < navHeight) {
								_navbar.removeClass('navbar-sticky');

							/** If scroll down */
							} else if (scrollTop > lastScrollTop) {
								_navbar.removeClass('navbar-sticky');
								_navMenu.removeClass('open');
								_btnMenu.removeClass('open');
							/** If scroll up */
							} else {
								_navbar.addClass('navbar-sticky');
							}
							// Set @lastScrollTop = @scrollTop
							lastScrollTop = scrollTop;
						}

						// If data[fixed] is turn on
						if (navbarFixed) {
							/** If scroll < navbar */
							if (scrollTop < navHeight) {
								_navbar.removeClass('navbar-fixed');
							} else {
								_navbar.addClass('navbar-fixed');
							}
						}
					});
				} catch(err) {
					console.error(err);
				}
		    })
		},
		carouselConfig: function(config) {
			return this.each(function(){
				var carouselWidth = config.carouselWidth;
				var carouselHeight = config.carouselHeight;
				var carouselInterval = config.carouselInterval;
				var carouselTimeInterval = config.carouselTimeInterval;
				if(carouselWidth || carouselHeight) {
					$(this).css({
						width: carouselWidth,
						height: carouselHeight,
					})
				}
				if(carouselInterval) {
					setInterval(function() {
						countNumber = count++;
						$('.carousel-check').removeClass('checked')
						$(`.carousel-${countNumber + 1}`).addClass('checked');
						if($('.carousel-img').length > countNumber ) {
							$('.carousel-slider').css('transform',`translateX(-${countNumber}00%)`);
						}else{
							$(`.carousel-${1}`).addClass('checked');
							$('.carousel-slider').css('transform',`translateX(0%)`);
							count = 1;
						}
					}, (carouselTimeInterval != undefined) ? carouselTimeInterval : 3000);
				}
				for(let i = 1; i <= $('.carousel-img').length; ++i) {
					$(`.carousel-${i}`).on('click',function() {
						count = i;
						$('.carousel-check').removeClass('checked')
						$(`.carousel-${i}`).addClass('checked');
						$('.carousel-slider').css('transform',`translateX(-${i - 1}00%)`);
					})
				}
			})
		}
	});
})