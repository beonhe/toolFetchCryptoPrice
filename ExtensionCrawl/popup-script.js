function fetchCryptoPrice(isStart) {
	document.getElementById("status").innerHTML = 'In processing...';
	chrome.runtime.sendMessage({
		src: "popup",
		isStartFetch: isStart || false,
		priceBuy: document.getElementById("price-buy").value,
		quantityBuy: document.getElementById("quantity-buy").value
	}, (res) => {
		console.log(res);
		document.getElementById("status").innerHTML = "Done";
	});
}

document.getElementById("start-fetch").addEventListener("click", () => fetchCryptoPrice(true));
document.getElementById("stop-fetch").addEventListener("click", () => fetchCryptoPrice());