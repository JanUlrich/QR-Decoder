	
	qrcode.callback = function(data){
		//console.log("QR-Code decoded: " + data);
		self.postMessage(data); //Send data back to main.js
	}

	var imageUrl = self.options.src; //The url of the qrcode image gets passed by options value
	qrcode.decode(imageUrl);
	//console.log("Start decoding: "+imageUrl);
	
	//TODO: If it is not able to decode: display error message!