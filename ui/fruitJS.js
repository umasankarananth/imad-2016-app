function loadCommentForm () {
   
        var obj = document.getElementById('comment_text').value;
        var submit =document.getElementById('submit'); 
      
   
    
}



function loadLoginNext() {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                window.alert('loginnext is loaded');
                //loadCommentForm();
                 
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLoginNext();
//loadCommentForm();