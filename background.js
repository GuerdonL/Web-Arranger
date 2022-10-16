chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {schemes: ['https', 'http']},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

// on load, inject content.js into current tab
window.onload = function() {
    // get the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // send a request to content.js to run the script
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'content.js'});
    });
};