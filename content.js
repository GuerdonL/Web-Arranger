alert("Please select the element you would like to edit.");
// variable to hold wheether or not we are selecting
var selecting = true;
// variable to hold previous parent div border
var prevBorder = null;
// variable to hold the currently selected element
var selectedElement = null;
//listen for a click on the webpage
document.addEventListener('click', function(e) {
    if (selecting){
        // set selecting to false
        selecting = false;
        //get the element that was clicked
        var element = e.target;
        //get the parent div of the element that was clicked
        var parent = element.parentElement;
        // if parent is not absolute
        if (parent.style.position != "absolute"){
            //get the parent's absolute position
            var parentPos = parent.getBoundingClientRect();
            // set the parent div to absolute
            parent.style.position = "absolute";
            // set the parent position and size to the parent's absolute position
            parent.style.top = parentPos.top + "px";
            parent.style.left = parentPos.left + "px";
            parent.style.width = parentPos.width + "px";
            parent.style.height = parentPos.height + "px";
        }
        // set the selected element to the parent div
        selectedElement = parent;
        // set parent border to 5px solid yellow
        parent.style.border = "5px solid yellow";
    }
});
// listen for hover on the webpage
document.addEventListener('mouseover', function(e) {
    // if we are selecting
    if (selecting) {
        //get the element that was hovered
        var element = e.target;
        //get the parent div of the element that was hovered
        var parent = element.parentElement;
        // assign the previous parent div border to a variable
        prevBorder = parent.style.border;
        // set the border of the parent div to 2px solid green
        parent.style.border = "2px solid green";
    }
});
// listen for hover off the webpage
document.addEventListener('mouseout', function(e) {
    // if we are selecting
    if (selecting) { 
        // get the element that was hovered off
        var element = e.target;
        // get the parent div of the element that was hovered off
        var parent = element.parentElement;
        // set the border of the parent div to the previous border
        parent.style.border = prevBorder;
    }
});
//listen for wasd key presses
document.addEventListener('keydown', function(e) {
    if(selecting){
        // if the key pressed was esc
        if (e.key == "Escape") {
            // set selecting to false
            selecting = false;
            // set the border of the selected element to previous border
            selectedElement.style.border = prevBorder;
        }
    }
    // if we are not selecting
    if (!selecting) {
        // and selected element is not null
        if (selectedElement != null) {
            // if the key pressed was w
            if (e.key == "w") {
                // move the selected element up 10px
                selectedElement.style.top = (parseInt(selectedElement.style.top) - 10) + "px";
            }
            // if the key pressed was a
            if (e.key == "a") {
                // move the selected element left 10px
                selectedElement.style.left = (parseInt(selectedElement.style.left) - 10) + "px";
            }
            // if the key pressed was s
            if (e.key == "s") {
                // move the selected element down 10px
                selectedElement.style.top = (parseInt(selectedElement.style.top) + 10) + "px";
            }
            // if the key pressed was d
            if (e.key == "d") {
                // move the selected element right 10px
                selectedElement.style.left = (parseInt(selectedElement.style.left) + 10) + "px";
            }
            // if the key pressed was esc
            if (e.key == "Escape") {
                // set the selected element border to previous border
                selectedElement.style.border = prevBorder;
                // set the selected element to null
                selectedElement = null;
                // set selecting to true
                selecting = true;
            }
            // if the key was backspace
            if (e.key == "Backspace") {
                // delete the selected element
                selectedElement.remove();
                selecting = true;
                selectedElement = null;
            }
        }
    }
});
// listen for a message from popup.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // if the message is to change the color of the selected element
        if (request.color) {
            // set the border of the selected element to 2px solid red
            selectedElement.style.border = "2px solid red";
            //set the background color of the selected element to the color sent from popup.js
            selectedElement.style.backgroundColor = request.color;
        }
    }
);