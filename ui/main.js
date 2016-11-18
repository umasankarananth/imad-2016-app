
  //SUBMIT username password to Login
  
  var submit = document.getElementById('submit_btn');
  
  submit.onclick = function(){ 
           //Create a request Object
                var request = new XMLHttpRequest();
           // capture the response & stored in a variable
                 request.onreadystatechange = function(){
                 if(request.readyState === XMLHttpRequest.DONE){
                     //Take some action
                     if(request.status === 200){
                         alert('Logged in Successfully');
                     }
                     else if(request.status=== 403){
                         alert('Username/Password is Incorrect');
                     }
                     else if(request.status===500){
                         alert('Something went wrong on the server');
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
                     request.setRequestHeader('Content-Type','application/json');
                     request.send(JSON.stringify({username:username, password: password}));
                          

  };
          