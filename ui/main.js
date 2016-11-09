
// COUNTER CODE

//var button = document.getElementById('counter');
//var counter = 0;
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
                 if(request.readyState === XMLHttpRequest.DONE){
           // Take some action
                 if(request.status === 200){
                         
                    //    var counter = request.responseText;
                    //    var span = document.getElementById('count');
                    // span.innerHTML = counter.toString();
                    // }
                    // }
        
                    //counter = counter + 1;
             
                    // var names = ['name1', 'name2', 'name3','name4'];
          //capture the list of names and render it as a list
                    var fruitlist= request.responseText;
                    fruitlist = JSON.parse(fruitlist);
                    var list ='';
                    for(var i = 0; i< fruitlist.length; i++){
                    list += '<li>' + fruitlist[i] +'</li>';
                    }
                    var ul = document.getElementById('namelist');
                    ul.innerHTML = list;
                    }
                }   
                 //Not done yet
            };
          //Make request to server and send the name
                    // var nameInput = document.getElementById('name');
                    // var name = nameInput.value;
                     request.open('GET' ,'http://umasankarananth.imad.hasura-app.io/product-entry', true);
                     request.send(null);
    };
     
          