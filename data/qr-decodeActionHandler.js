
//Only activate, when there are images on the website:
self.on("context", function (node) {
	return !!document.querySelector("img");
});

self.on("click", function (node, data) 
{
	var dataUrl = node.src;
	if(dataUrl == null)return; //TODO: Maybe display error message!

	//This Method display decoded QR-Code Data:
	qrcode.callback = function(data){
		console.log("QR-Code decoded: " + data);
		self.postMessage(data);
	}

	qrcode.decode(dataUrl);
	console.log("Start decoding: "+dataUrl);
	//TODO: If it is not able to decode: display error message!
});

