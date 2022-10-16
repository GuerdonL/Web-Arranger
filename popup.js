let select = document.getElementById('select');
let colorGreen = document.getElementById('colorGreen');

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

// when the button is clicked
select.onclick = function(element) {
  // set color of select button to green
  select.style.backgroundColor = "green";
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {mode: "select"}, function(response) {
      console.log(response.farewell);
    });
  });
};
////////////////////////////////////////////////////////////////////////////////////////  

// when the button is clicked
colorGreen.onclick = function(element) {
  // set color of colorGreen button to red
  colorGreen.style.backgroundColor = "green";

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {mode: "selectReplacement"}, function(response) {
      console.log(response.farewell);
    });
  });
};