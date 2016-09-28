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
//button.onclick = function(){
        
   //  };

 // Make the request
  
  //SUBMIT NAME
  
   var submit = document.getElementById('submit_btn');
  submit.onclick = function(){
              //Create a request Object
                var request = new XMLHttpRequest();
                // capture the response & stored in a variable
                request.onreadystatechange = function(){
                    if(request.onreadystatechange === XMLHttpRequest.DONE){
                            // Take some action
                     if(request.status === 200){
                         
                        //    var counter = request.responseText;
                        //    var span = document.getElementById('count');
                        // span.innerHTML = counter.toString();
                       // }
                        // }
            
                 //counter = counter + 1;
               
              //capture the list of names and render it as a list
             // var names = ['name1', 'name2', 'name3','name4'];
             var names= request.responseText;
             names = JSON.parse(names);
              var list ='';
              for(var i = 0; i< names.length; i++){
                  list += '<li>' + names[i] +'</li>';
              }
              var ul = document.getElementById('namelist');
              ul.innerHTML = list;
                     }
                }   
                 //Not done yet
          };
          //Make request to server and send the name
           var nameInput = document.getElementById('name');
           var name = nameInput.value;
            request.open('GET' ,'http://umasankarananth.imad.hasura-app.io/submit-name?name' + name, true);
            request.send(null);
      };
     
          