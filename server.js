var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session =  require('express-session');

var config = {
      user: 'umasankarananth',
      database: 'umasankarananth',
      host: 'db.imad.hasura-app.io',
      port: '5432',
      password: process.env.DB_PASSWORD
 };

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 *60 *24 * 30}
}));

function create(dt){
    var fname =  dt.fruitName;
    var ratePerKg = dt.ratePerKg;
     var fruheading = dt.fruheading;
     var fruimage= dt.fruimage;
     var fruitinfo = dt.fruitinfo;
var fruitTemplate =` 
<html>
    <head>
  <title>CHESNUT FRUITS> </title>
         <meta name ="viewport" content = "width-device-width, initial-scale-1"/>
         <link href="/ui/style.css" rel="stylesheet" />
</head>  
 
 <body>
 <div class = "container">
 <div class = "center">
 <H1> ${fruheading} </H1>
 <div align="left">
 <img src="http://www.w3schools.com/html/smiley.gif" alt="Smiley face" style="float:left;width:50px;height:50px;">
<a href= "/">Home</a>
<a href="/orange">Orange</a>
<a href="/apple">Apple</a>
<a href="/grapes">Grapes</a>
<a href="/mango">Mango</a> 
</div>
<div align = "right">
<a href="/fruitmenu">Main menu</a>
</div>
<div>
<img src="http://www.w3schools.com/html/smiley.gif" alt="Smiley face" style="float:right;width:50px;height:50px;"> 
</div>
<hr/> 
 <div>
 <img src="${fruimage}" class="img-medium"> 
  </div>
 <br>
 <div class = "text-big">
  Fruit name : ${fruheading}
  <br/>
  Rate per kg : Rs ${ratePerKg}
  </div>
  <br/>
  <div align="justify">
      ${fruitinfo}
 </div>
</div>
</body>
</html>
 `;
return fruitTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2Sync",10000,salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res)
{
  var hashedString = hash(req.params.input,'some-random-string');
  res.send(hashedString);
});

app.post('/create-user',function(req,res){
   //username password
   //username : 'umasankar' password : 'ananth'
   //JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password)VALUES ($1,$2)',[username,dbString],function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
               res.send('User Successfully Created' + username);
                } 
         });
});

app.post('/login',function(req,res){
 var username = req.body.username;
   var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1',[username], function(err,result){
        
      if(err){
           res.status(500).send(err.toString());
           }else{
          if(result.rows.length=== 0){
              res.send(403).send('user/password is invalid');
          }
          else{
              //match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password,salt);//creating a hash based on thepassword submitted and the original salt
              if(hashedPassword === dbString){
                  
                  //set the session
                   req.session.auth = {userId: result.rows[0].id};
                  //set cookie with a session id
                  //Internally on the sever side, it maps the session id to an object
                  //{auth: {userId}}
                  
                  res.send('credientials are correct');
              }
       
                  else{
               res.send(403).send('username/password is invalid');
                } 
          }
      }      
  });
});

app.get('/check-login', function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
        if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function(req,res){
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});

var pool = new Pool(config);
app.get('/articles/:fname', function (req, res) {
  // SELECT * FROM fruitprce WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM fruitprice WHERE fruitName = $1", [req.params.fname], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});

app.get('/orange', function (req, res) {
    //Make a select request
  //return the response with the results
   // pool.query("SELECT * FROM fruitprice where fruitName ='" +req.params.fname+"'", function(err,result){
    // pool.query("SELECT * FROM fruitprice where fruitName = $1",[req.params.fname], function(err,result){
      pool.query('SELECT * FROM fruitprice ',function(err,result){
       if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length=== 0){
              res.status(404).send('fruit not found');
          }else{
               
               var frutData =result.rows[0];
               res.send(create(frutData));
                } 
     
          }

  });
  
});

app.get('/apple', function (req, res) {
      pool.query('SELECT * FROM fruitprice',function(err,result){
       if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length=== 0){
              res.status(404).send('fruit not found');
          }else{
               
              var frutData =result.rows[1];
               res.send(create(frutData));
                } 
      }
      });
  
});
app.get('/grapes', function (req, res) {
    pool.query('SELECT * FROM fruitprice',function(err,result){
       if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length=== 0){
              res.status(404).send('fruit not found');
          }else{
               
              var frutData =result.rows[2];
               res.send(create(frutData));
                } 
      }
      });
  
});

app.get('/mango', function (req, res) {
    pool.query('SELECT * FROM fruitprice',function(err,result){
       if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length=== 0){
              res.status(404).send('fruit not found');
          }else{
               
              var frutData =result.rows[3];
               res.send(create(frutData));
                } 
      }
      });
  
});
  

app.get('/welcomeform', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'welcomeform.html'));
});

app.get('/fruitmenu', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'fruitmenu.html'));
});
//app.get('/:prodName', function(req,res){
  //  var prodName = req.params.prodName;
    //    res.send(create(products[prodName]));  
//});

app.get('/feedback', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'feedback.html'));
});

app.get('/ui/main.js', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
