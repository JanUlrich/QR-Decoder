
//Only activate, when there are images on the website:
self.on("context", function (node) {
	return !!document.querySelector("img");
});

self.on("click", function (node, data) 
{
	self.postMessage(node.src);
});

