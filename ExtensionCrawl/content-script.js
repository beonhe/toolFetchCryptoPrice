const SANDBOX_PT_API = 'https://sandbox.primetrust.com';
let interval;
chrome.runtime.sendMessage({
	src: "content-script",
	status: 'loading'
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.src === 'popup') {
		if (request.isStartFetch) {
			startFetch(request.priceMatch);
		} else {
			stopFetch();
		}
	}
	
	return true;
});

function startFetch(priceMatch) {
	interval = setInterval(function() {
		let price = document.getElementById("currPrice").innerHTML;
		let cryptoName = document.getElementById("curr_a_name").innerHTML;
		console.log("Price " + cryptoName + " is: " + price);
		if (price < priceMatch) {

		}
	}, 1000);
}

function stopFetch() {
	clearInterval(interval);
	return;
}
