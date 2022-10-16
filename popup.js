let select = document.getElementById('select');
let colorGreen = document.getElementById('colorGreen');

// set the color of the color button
chrome.storage.sync.get('color', function(data) {
  select.style.backgroundColor = data.color;
  select.setAttribute('value', data.color);
});
//set the color of the select button
chrome.storage.sync.get('color', function(data) {
  colorGreen.style.backgroundColor = data.color;
  colorGreen.setAttribute('value', data.color);
});
// when the button is clicked
select.onclick = function(element) {
  // inject content.js into current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'content.js'});
  });
};
////////////////////////////////////////////////////////////////////////////////////////  

// when the button is clicked
colorGreen.onclick = function(element) {
  // set color of colorGreen button to red
  colorGreen.style.backgroundColor = "red";
  colorGreen.setAttribute('value', "red");
  // send message to content.js to change the color of the selected element to green
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {color: "green"});
  });
};