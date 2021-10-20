function setClickHandler(id, fn) {
	videos = document.getElementsByClassName(id)
	for (var i=0; i < videos.length; i++) {
		videos[i].onclick = fn
	}
}

setClickHandler('vid', function(e) {
		var className = e.target.className
		if (~className.indexOf('htmlvid')) {
			BigPicture({
				el: e.target,
				vidSrc: e.target.getAttribute('vidSrc'),
			})
		} else if (~className.indexOf('vimeo')) {
			BigPicture({
				el: e.target,
				vimeoSrc: e.target.getAttribute('vimeoSrc'),
			})
		} else if (~className.indexOf('twin-peaks')) {
			BigPicture({
				el: e.target,
				ytSrc: e.target.getAttribute('ytSrc'),
				dimensions: [1226, 900],
			})
		} else if (~className.indexOf('youtube')) {
			BigPicture({
				el: e.target,
				ytSrc: e.target.getAttribute('ytSrc'),
			})
		}
	})
