function fetchCryptoPrice(isStart) {
	document.getElementById("status").innerHTML = 'In processing...';
	chrome.runtime.sendMessage({
		src: "popup",
		isStartFetch: isStart || false,
		priceMatch: document.getElementById("price-match").innerHTML
	}, (res) => {
		document.getElementById("status").innerHTML = 'Done';
	});
}

document.getElementById("start-fetch").addEventListener("click", () => fetchCryptoPrice(true));
document.getElementById("stop-fetch").addEventListener("click", () => fetchCryptoPrice());