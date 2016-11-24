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