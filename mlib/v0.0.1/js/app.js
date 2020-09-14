$(function () {
	urlProto = window.location.protocol;
	urlPage = window.location.origin + '/';
	urlHref = window.location.href;
	urlHost = window.location.host;
	urlPath = window.location.pathname;
	urlpathReplace = (urlHref === urlPage) ? urlPath : urlPath.replace(/[/]$/g, '')
	// urlNow = protocol + '//' + hostName + pathName + '.html';

	function checkFileExist(url) {
		// console.log(urlpathReplace);
		// console.log(ROUTES.routes.path);
	}

	$('.navbar').navbarConfig({
		navbarSize: 'default',
		navbarBackground: 'default',
		navbarFixed: false,
		navbarFullHeight: true,
		navbarShowOnScroll: false,
	})
	$('.carousel').carouselConfig({
		carouselAnimation: 'effect-3',
		carouselLoop: false,
		carouselBoxshadow: true,
		carouselRadius: true,
		carouselResponsive: true,
		carouselInterval: true,
		carouselTimeInterval: 3000,
	})
})