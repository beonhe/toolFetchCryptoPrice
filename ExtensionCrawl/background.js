var tabId = 0;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.src === 'content-script' && sender.tab.id) {
			tabId = sender.tab.id;
		}

		if (request.src === 'popup') {
			chrome.tabs.sendMessage(tabId, request, (res) => {
				sendResponse(true);
			});
		}
		
		return true;
	}
);