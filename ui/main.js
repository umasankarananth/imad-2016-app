console.log('Loaded!');
// MOVING THE IMAGE

    //change the text of main-text div. uncomment lines 3, 4
    //var element = document.getElementById('main-text');
    //element.innerHTML = 'New Value';
    
    // move the image left by 100px on clicking the image .To do that Uncomment made on Line 15 .and comment remaining lines.
    // To move the image towards Right slowly on clicking the image , use the following syntax and comment line 15 and Uncomment remaining lines. Except lines 8,14,15
    
    //var img = document.getElementById('madi');
    //var marginLeft= 0;
    //function moveRight(){
    //  marginLeft = marginLeft + 1;
        //img.style.marginLeft = marginLeft + 'px';
    //}
    //img.onclick = function () {
    // img.style.marginLeft = '100px';
    // var interval = setInterval(moveRight , 50);
    //};


// COUNTER CODE

var button = document.getElementById('counter');
var counter = 0;
button.onclick = function(){
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};
  