//Submit username/password to login
var currentArticleTitle = window.location.pathname.split('/')[2];
window.alert(currentArticleTitle);
function loadCommentForm () {
        window.alert('loadcommentform  is called');
         var commentFormHtml = `
        <h5>Submit a comment</h5>
        <textarea id="comment_text" rows="5" cols="100" placeholder="Enter your comment here..."></textarea>
        <br/>
        <input type="submit" id="submit" value="Submit" />
        <br/>
        `;
       document.getElementById('comment_form').innerHTML = commentFormHtml;
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
                    document.getElementById('comment_text').value =" ";
                   // loadComments();    
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
         request.send(JSON.Stringify(comment));
        window.alert(comment);
        window.alert(currentArticleTitle);
        submit.value = 'Submitting...';
        
    };

       
}
       
function loadLogin() {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                window.alert('loginnext is loaded');
                loadCommentForm(this.responseText);
                 
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();
//loadComments();