$(function() {
	var times;
	var	_body = $('body');
	var	_button = $('button');
	var	_navbar = $('.navbar');
	var	_navMenu = $('.navbar-menu');

	var lastScrollTop = 0;
	var navHeight = $('.navbar').outerHeight();

	$(window).on('scroll', function() {
		var scrollTop = $(document).scrollTop();
		if(_navbar.data('showonscroll') == true) {
			if( scrollTop < navHeight ) {
				_navbar.removeClass('navbar-sticky');
			}else if( scrollTop > lastScrollTop) {
				_navbar.removeClass('navbar-sticky');
				_navMenu.removeClass('open');
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

	$(`[data-toggle='toggle-menu']`).on('click', function() {
		_fullHeightNavmenu = $(this).data('fullheight');
		_body.toggleClass('hidden');
		_navMenu.toggleClass('open');
		$(this).toggleClass('open');

		if(_fullHeightNavmenu == true) {
			_navMenu.toggleClass('fullheight')
		}
	})

	$(`button[class*='effect']`).on('click', function() {
		$(this).addClass('animation');
		setTimeout(()=>{
			_button.removeClass('animation')
		},500);
	})

	$(`[data-ripple='true']`).on('click', function(e) {
		let x = e.clientX - e.target.offsetLeft;
		let y = e.clientY - e.target.offsetTop;

		let ripples = $(this).append(`<span class='ripple' style='left: ${x}px; top: ${y}px;'></span>`);

		clearTimeout(times);

		var times = setTimeout( () => {
			$(this).find('span').remove();
		}, 1000)
	})
})