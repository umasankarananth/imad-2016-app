//Submit username/password to login
var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
        window.alert('fruitJs  is called');
       var submit = document.getElementById('submit');
       submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').innerHTML=" Tasty fruit";
                    //loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };

  
// Make the request
        var comment = document.getElementById('comment_text').value;
        window.alert('submitcomment is going to call');
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}
        



function loadLoginNext() {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                window.alert('loginnext is loaded');
                loadCommentForm();
                 
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLoginNext();
//loadCommentForm();