let interval;
const elmBuyPrice = document.getElementById('ask_rate');
const elmBuyTotal = document.getElementById('ask_vol');
const elmCurrentPrice = document.getElementById("currPrice");
const elmCryptoName = document.getElementById("curr_a_name");
chrome.runtime.sendMessage({
	src: "content-script",
	status: 'loading'
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.src === 'popup') {
		if (request.isStartFetch) {
			startFetch(request.priceBuy, request.quantityBuy, sendResponse);
		} else {
			stopFetch(sendResponse);
		}
	}
	return true;
});

function startFetch(priceBuy, quantityBuy, sendResponse) {
	clearInterval(interval);
	if (!priceBuy || priceBuy <= 0) {
		sendResponse(true);
		return;
	}
	localStorage.setItem('priceBuy', JSON.stringify(priceBuy));
	interval = setInterval(function() {
		let price = elmCurrentPrice.innerHTML.replaceAll('\,','');
		let cryptoName = elmCryptoName.innerHTML;
		console.log("Price " + cryptoName + " is: " + price + ' will buy at: ' + priceBuy);
		if (Number(price) <= Number(priceBuy)) {
			console.log('Buy ' + quantityBuy + ' tokens at price: ' + priceBuy)
			elmBuyPrice.value = priceBuy;
			elmBuyTotal.value = quantityBuy;
			clearInterval(interval);
			sendResponse(true);
		}
	}, 1000);
}

function stopFetch(sendResponse) {
	clearInterval(interval);
	sendResponse(true);
	return;
}
