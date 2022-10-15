// variable to hold previous parent div border
var prevBorder = null;
//listen for a click on the webpage
document.addEventListener('click', function(e) {
    //get the element that was clicked
    var element = e.target;
    //get the parent div of the element that was clicked
    var parent = element.parentElement;
    //set the background color of the parent div to green
    parent.style.backgroundColor = "green";
});
// listen for hover on the webpage
document.addEventListener('mouseover', function(e) {
    //get the element that was hovered
    var element = e.target;
    //get the parent div of the element that was hovered
    var parent = element.parentElement;
    // assign the previous parent div border to a variable
    prevBorder = parent.style.border;
    // set the border of the parent div to 2px solid green
    parent.style.border = "2px solid green";
});
// listen for hover off the webpage
document.addEventListener('mouseout', function(e) {
    // get the element that was hovered off
    var element = e.target;
    // get the parent div of the element that was hovered off
    var parent = element.parentElement;
    // set the border of the parent div to the previous border
    parent.style.border = prevBorder;
});
