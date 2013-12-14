
var data = require("sdk/self").data;
var notifications = require("sdk/notifications");
var clipboard = require("sdk/clipboard");
var cm = require("sdk/context-menu");

var decoderScript = data.url("./qrDecodePanel.js");
var jsQRCodeFiles = [
	data.url("./jsqrcode/src/grid.js"),
	data.url("./jsqrcode/src/version.js"),
	data.url("./jsqrcode/src/detector.js"),
	data.url("./jsqrcode/src/formatinf.js"),
	data.url("./jsqrcode/src/errorlevel.js"),
	data.url("./jsqrcode/src/bitmat.js"),
	data.url("./jsqrcode/src/datablock.js"),
	data.url("./jsqrcode/src/bmparser.js"),
	data.url("./jsqrcode/src/datamask.js"),
	data.url("./jsqrcode/src/rsdecoder.js"),
	data.url("./jsqrcode/src/gf256poly.js"),
	data.url("./jsqrcode/src/gf256.js"),
	data.url("./jsqrcode/src/decoder.js"),
	data.url("./jsqrcode/src/qrcode.js"),
	data.url("./jsqrcode/src/findpat.js"),
	data.url("./jsqrcode/src/alignpat.js"),
	data.url("./jsqrcode/src/databr.js")
];


cm.Item({
  label: "Decode QR-Code",
  context: cm.SelectorContext("img"),
  contentScriptFile: [data.url("qr-decodeActionHandler.js")],
  onMessage: function(message){
	processImageDecodeEvent(message);
  }
});

var processImageDecodeEvent = function(imageUrl){
	if(imageUrl == null)return; //TODO: Maybe display error message!

	var panel = require("sdk/panel").Panel({
	  contentURL: imageUrl,
	  contentScriptFile: jsQRCodeFiles.concat(decoderScript),
	  contentScriptOptions: {src: imageUrl},
	  onMessage: function(message){
	  	notifyQRCodeData(message);
	  	panel.destroy();
	  }
	});
}

var notifyQRCodeData = function(data){
	notifications.notify({
	  title: data,
	  text: "(click to copy to clipboard)",
	  data: data,
	  onClick: function (data) {
		clipboard.set(data, "text");
	  }
	});
}