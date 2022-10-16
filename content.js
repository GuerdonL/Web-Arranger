// variable to hold wheether or not we are selecting
var selecting = false;
// variable to hold previous parent div border
var prevBorder = null;
// variable to hold the currently selected element
var selectedElement = null;
var replacement = false;
//listen for a click on the webpage
document.addEventListener('click', function(e) {
    if (selecting){
        // if the  element clicked is not the body or div
        if (e.target != document.body && e.target != div) {
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
            // if replacement is true
            if (replacement){
                // make an empty div with the same dimensions as the parent
                var div = document.createElement("div");
                div.style.width = parentPos.width + "px";
                div.style.height = parentPos.height + "px";
                div.style.position = parent.style.position;
                // insert the div before the parent
                parent.parentElement.insertBefore(div, parent);
            }
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
        // call the toolbar function
        toolbar();
    }
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
        }
    }
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.mode === "select"){
            selecting = true;
            replacement = false;
        }
        if (request.mode === "selectReplacement") {
            selecting = true;
            replacement = true;
        }
    }
);

var div = document.createElement("div");
var colorPicker = document.createElement("input");
var widthInput = document.createElement("input");
var heightInput = document.createElement("input");
// make x and y inputs
var xInput = document.createElement("input");
var yInput = document.createElement("input");
var quitButton = document.createElement("button");
var deleteButton = document.createElement("button");
var dechildButton = document.createElement("button");
//toolbar function
function toolbar() {
    // if div has no parent
    if (div.parentElement == null) {
    //create a fixed div on the top layer
    div.style.position = "fixed";
    // set div id to toolbar
    div.id = "toolbar";
    //place the div in the top right corner
    div.style.top = "0px";
    div.style.right = "0px";
    // set the div to 200 x 500
    div.style.width = "200px";
    div.style.height = "500px";
    // set the div background to white
    div.style.backgroundColor = "white";
    // set the div border to 1px solid black
    div.style.border = "1px solid black";
    // set div radius to 5px
    div.style.borderRadius = "5px";
    // insert the div into the body
    document.body.appendChild(div);
    // move the div to the top of the page
    document.body.insertBefore(div, document.body.firstChild);
    // place at -1 z-index
    div.style.zIndex = "1000000000000";
    // creat a color picker
    colorPicker.type = "color";
    colorPicker.value = "red";
    colorPicker.style.width = "100%";
    colorPicker.style.height = "50px";
    colorPicker.style.marginTop = "10px";
    colorPicker.style.marginBottom = "10px";
    //add the color picker to the div
    div.appendChild(colorPicker);
    // create a div for the width and height inputs
    var widthDiv = document.createElement("div");
    widthDiv.style.width = "100%";
    widthDiv.style.height = "50px";
    widthDiv.style.marginTop = "10px";
    widthDiv.style.marginBottom = "10px";
    // widthDiv auto layout 
    widthDiv.style.display = "flex";
    // set flex direction to row
    widthDiv.style.flexDirection = "row";
    widthInput.type = "number";
    widthInput.value = parseInt(selectedElement.style.width);
    // add text before the width input saying width
    var widthText = document.createElement("p");
    widthText.innerHTML = "Width: ";
    // make a height input
    heightInput.type = "number";
    heightInput.value = parseInt(selectedElement.style.height);
    // add text before the height input saying height
    var heightText = document.createElement("p");
    heightText.innerHTML = "Height: ";
    // add the width and height inputs to the width div
    // make height div as a copy of width div
    var heightDiv = widthDiv.cloneNode(true);
    // create x and y divs as copies of width div
    var xDiv = widthDiv.cloneNode(true);
    var yDiv = widthDiv.cloneNode(true);
    // add height div to the div
    div.appendChild(widthDiv);
    div.appendChild(heightDiv);
    widthDiv.appendChild(widthText);
    widthDiv.appendChild(widthInput);
    heightDiv.appendChild(heightText);
    heightDiv.appendChild(heightInput);
    // add the width div to the div
    //////////////////////////////////////////////////////////////////////
    // add x and y divs to the div
    div.appendChild(xDiv);
    div.appendChild(yDiv);
    // set x and y inputs to number type
    xInput.type = "number";
    yInput.type = "number";
    // set x and y inputs to the current x and y of the selected element
    xInput.value = parseInt(selectedElement.style.left);
    yInput.value = parseInt(selectedElement.style.top);
    // add text before the x and y inputs saying x and y
    var xText = document.createElement("p");
    var yText = document.createElement("p");
    xText.innerHTML = "X: ";
    yText.innerHTML = "Y: ";
    // add the x and y inputs to the x and y divs
    xDiv.appendChild(xText);
    xDiv.appendChild(xInput);
    yDiv.appendChild(yText);
    yDiv.appendChild(yInput);
    // add a button to the div that says "Attempt to Dechild"
    dechildButton.innerHTML = "Attempt to De-Child";
    dechildButton.style.width = "100%";
    dechildButton.style.height = "50px";
    dechildButton.style.marginTop = "10px";
    dechildButton.style.marginBottom = "10px";
    div.appendChild(dechildButton);
    // add a button to the div that says "Delete"
    deleteButton.innerHTML = "Delete";
    deleteButton.style.width = "100%";
    deleteButton.style.height = "50px";
    deleteButton.style.marginTop = "10px";
    deleteButton.style.marginBottom = "10px";
    div.appendChild(deleteButton);
    // add a button to the div that says "quit"
    quitButton.innerHTML = "Quit";
    quitButton.style.width = "100%";    
    quitButton.style.height = "50px";
    quitButton.style.marginTop = "10px";
    quitButton.style.marginBottom = "10px";
    div.appendChild(quitButton);
    }
}

// on input to the color picker
colorPicker.oninput = function() {
    // set the selected element background to the color picker value
    selectedElement.style.backgroundColor = colorPicker.value;
}
// on input to the width input
widthInput.oninput = function() {
    // set the selected element width to the width input value if > 0
    if (parseInt(widthInput.value) > 0) {
        selectedElement.style.width = widthInput.value + "px";
    } // else set the width input value to the selected element width
    else {
        widthInput.value = parseInt(selectedElement.style.width);
    }
}
// on input to the height input
heightInput.oninput = function() {
    // set the selected element height to the height input value if > 0
    if (parseInt(heightInput.value) > 0) {
        selectedElement.style.height = heightInput.value + "px";
    } // else set the height input value to the selected element height
    else {
        heightInput.value = parseInt(selectedElement.style.height);
    }
}
// on input to the x input
xInput.oninput = function() {
    // set the selected element x to the x input value
    selectedElement.style.left = xInput.value + "px";
}
// on input to the y input
yInput.oninput = function() {
    // set the selected element y to the y input value
    selectedElement.style.top = yInput.value + "px";
}
// on click of the dechild button
dechildButton.onclick = function() {
    // remove the selected element from its parent
    selectedElement.parentNode.removeChild(selectedElement);
    // append the selected element to the body
    document.body.appendChild(selectedElement);
}
// on click of the delete button
deleteButton.onclick = function() {
    // remove the selected element from the body
    document.body.removeChild(selectedElement);
    // set the selected element to null
    selectedElement = null;
    // set selecting  to true
    selecting = true;
}
// on click of the quit button
quitButton.onclick = function() {
    document.body.removeChild(div);
    selectedElement.style.border = prevBorder;
    replacement = false;
    selecting = false;
    // remove the div
    // set selected element border to previous border
    selectedElement = null;
}