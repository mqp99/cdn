$(function() {
	var times;
	var	_body = $('body');
	var	_button = $('button');
	var	_navbar = $('.navbar');
	var	_navMenu = $('.navbar-menu');

	var lastScrollTop = 0;
	var navHeight = $('.navbar').outerHeight();

	$(window).on('scroll', function scrollNavbar() {
		var scrollTop = $(document).scrollTop();

		if(_navbar.data('showonscroll') == true) {
			if( scrollTop < navHeight ) {
				_navbar.removeClass('navbar-sticky');
			}else if( scrollTop > lastScrollTop) {
				_navbar.removeClass('navbar-sticky');
				_navMenu.removeClass('open');
				$(`[data-toggle='toggle-menu']`).removeClass('open');
			}else{
				_navbar.addClass('navbar-sticky');
			}
			lastScrollTop = scrollTop;
		}
		
		if(_navbar.data('fixed') == true) {
			if( scrollTop < navHeight ) {
				_navbar.removeClass('navbar-fixed');
			}else{
				_navbar.addClass('navbar-fixed');
			}
		}
	})

	$('.menu-link-drop').on('click', function toggleMenuDrop() {
		$(this).siblings().removeClass('open');
		$(this).toggleClass('open');
	})

	$('.navbar-menu li').on('click', function toggleActiveMenu() {
		$('.navbar-menu li').removeClass('active');
		$(this).toggleClass('active')
	})

	$(`[data-toggle='toggle-menu']`).on('click', function toggleMenu() {
		_fullHeightNavmenu = $(this).data('fullheight');
		// _body.toggleClass('hidden'); disabled body scroll
		_navMenu.toggleClass('open');
		$(this).toggleClass('open');

		if(_fullHeightNavmenu == true) {
			_navMenu.toggleClass('fullheight')
		}
	})

	$(`button[class*='effect']`).on('click', function toggleEffect() {

		$(this).addClass('animation');

		setTimeout(()=>{ 
			_button.removeClass('animation') 
		},500);
	})

	$(`[data-ripple='true']`).on('click', function toggleRipple(e) {
		let x = $(window).scrollLeft() - $(this).offset().left + e.clientX;
		let y = $(window).scrollTop() - $(this).offset().top + e.clientY;

		let ripples = $(this).append(`<div class='ripple' style='left: ${x}px; top: ${y}px;'></div>`);

		setTimeout( () => {
			$(this).find('div:first').remove();
		}, 900)
	})
})