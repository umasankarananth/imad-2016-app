
  //SUBMIT username password to Login
  
  var submit = document.getElementById('submit_btn');
  
  sub.onclick = function(){ 
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
             
                     //var names = ['name1', 'name2', 'name3','name4'];
          //capture the list of names and render it as a list
                    //var fruitlist= ['apple','orange','grapes'];
                    var names = request.responseText;
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
                     var username = document.getElementById('username').value;
                      var password = document.getElementById('password').value;
                      console.log(username);
                      console.log(password);
                     request.open('POST' ,'http://umasankarananth.imad.hasura-app.io/login', true);
                     request.send(JSON.stringify({username:username, password: password}));
    };
     
          