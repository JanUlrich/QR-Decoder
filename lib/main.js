
var data = require("sdk/self").data;
var notifications = require("sdk/notifications");
var clipboard = require("sdk/clipboard");
var cm = require("sdk/context-menu");

var contentScriptFiles = [
	data.url("qr-decodeActionHandler.js"),
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

var openImageEditor = function(imageSrc){
	console.log("Image: "+imageSrc);
}



cm.Item({
  label: "Decode QR-Code",
  context: cm.SelectorContext("img"),
  contentScriptFile: contentScriptFiles,
  onMessage: function(message){
	notifications.notify({
	  title: message,
	  text: "(click to copy to clipboard)",
	  data: message,
	  onClick: function (data) {
		clipboard.set(message, "text");
	  }
	});
  }
});
