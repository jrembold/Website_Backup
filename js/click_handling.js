function setClickHandler(id, fn) {
	videos = document.getElementsByClassName(id)
	for (var i=0; i < videos.length; i++) {
		videos[i].onclick = fn
	}
}

const getSHA256Hash = async (input) => {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
  return hash;
};

setClickHandler('vid', async function(e) {
		var className = e.target.className;
		var en_pswd = e.target.getAttribute("data-video-password");
		console.log(en_pswd);
		var pswd = "";
		if (en_pswd) {
			var pswd = await getSHA256Hash(prompt("Please enter the password:"));
		}
		if (!en_pswd | pswd === en_pswd) {
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
		} else {
			alert("Invalid password");
		}
	})
