$(function () {
	/** Variable default here */
	var times;
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


	/** WHEN ACTIVE SCROLL FUNCTION */
	$(window).on('scroll', function scrollNavbar() {
		// Get height scroll top now
		var scrollTop = $(document).scrollTop();

		// If @data[showonscroll] is turn on
		if (_navbar.data('showonscroll') == true) {
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
		if (_navbar.data('fixed') == true) {
			/** If scroll < navbar */
			if (scrollTop < navHeight) {
				_navbar.removeClass('navbar-fixed');
			} else {
				_navbar.addClass('navbar-fixed');
			}
		}
	})

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

		// Check full height active turn ON ?
		_fullHeightNavmenu = $(this).data('fullheight');

		// If full height active
		if (_fullHeightNavmenu == true) {
			_navMenu.toggleClass('fullheight')
		}
	})

	/** WHEN BUTTON effect CLICK | active animation */
	_btnEffect.on('click', function toggleEffect() {

		$(this).addClass('animation');

		setTimeout(() => {
			_button.removeClass('animation')
		}, 500);
	})

	/** WHEN BUTTON ripple CLICK | active ripple */
	_btnRipple.on('click', function toggleRipple(e) {
		let x = $(window).scrollLeft() - $(this).offset().left + e.clientX;
		let y = $(window).scrollTop() - $(this).offset().top + e.clientY;

		let ripples = $(this).append(`<div class='ripple' style='left: ${x}px; top: ${y}px;'></div>`);

		setTimeout(() => {
			$(this).find('div:first').remove();
		}, 900)
	})
})