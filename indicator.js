
chrome.runtime.onMessage.addListener(function (message) {
	console.log('msg received:'+message);
	showStartAnim(message);
});

function showStartAnim(msg){
	var src;
	var shadow;
	if(msg=='safe'){
		src=chrome.runtime.getURL('icons/startd.png');
		shadow='box-shadow:10px 10px 50px 20px rgb(147, 253, 147);';
	} else if (msg=='danger'){
		src=chrome.runtime.getURL('icons/startdr.png');
	} else {
		return;
	}
	console.log('showing animation');
	var img = document.createElement('img');
	img.src = src;
	img.style.cssText = 'position:fixed;opacity:1;z-index:999999;width:100px;height:100px;';
	document.body.appendChild(img);
	img.style.left = '70%';
	img.style.top  = '30%';
	setTimeout(function () {
		img.style.webkitTransition = 'all 2s';
		img.style.left = '90%';
		img.style.top  = '-10%';
		img.style.opacity  = .5;
		img.style.width  = 30 + 'px';
		img.style.height = 30 + 'px';
		setTimeout(function () {
			document.body.removeChild(img);
		}, 3000);
	}, 100);
}