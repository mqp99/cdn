$(function () {
	urlProto = window.location.protocol;
	urlPage = window.location.origin + '/';
	urlHref = window.location.href;
	urlHost = window.location.host;
	urlPath = window.location.pathname;
	urlpathReplace = (urlHref === urlPage) ? urlPath : urlPath.replace(/[/]$/g, '')
	// urlNow = protocol + '//' + hostName + pathName + '.html';

	ROUTES = {
		routes: {
			path: '/document',
			url: 'document.html',
			title: 'Documentation'
		}
	}

	checkFileExist()

	function checkFileExist(url) {
		// console.log(urlpathReplace);
		// console.log(ROUTES.routes.path);
	}
})