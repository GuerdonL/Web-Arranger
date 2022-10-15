//listen for a click on the webpage
document.addEventListener('click', function(e) {
    //get the element that was clicked
    var element = e.target;
    //get the parent div of the element that was clicked
    var parent = element.parentElement;
    //set the background color of the parent div to green
    parent.style.backgroundColor = "green";
});
