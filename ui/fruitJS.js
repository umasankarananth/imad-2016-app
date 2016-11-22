function loadLoginNext() {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                //loadCommentForm();
                 window.alert('loginnext is loaded');
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}
loadLoginNext();
//loadCommentForm();