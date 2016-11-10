var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
      user: 'umasankarananth',
      database: 'umasankarananth',
      host: 'db.imad.hasura-app.io',
      port: '5432',
      password: process.env.DB_PASSWORD
 };

var app = express();
app.use(morgan('combined'));


//var prod = {
   // fruitId : 1,
    // fruitName :  'apple',
    // rate : 30
     //};
  

function create(dt){
   
    var fruitName =  dt.fruitName;
    var ratePerKg = dt.ratePerKg;
   
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
  <H1> ORANGE </H1>
  <div align="left">
  <a href="/">Home</a>
  </div>
 <div align="right">
 <a href = "/welcomeform">Previous</a>         
 </div>
 <hr/> 
 <div>
 <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTtFPCG_24fGo4w-pT0B0UAo6uDyTmmQTL7jIJOevrzb2RIcxePYw" class="img-medium"> 
 </div>
 <br>
 <div class = "bold">
  Fruit Name : ${fruitName}
  <br/>
  Rate Per kg : ${ratePerKg}
  </div>
 </div>
</div>
</body>

</html>
 `;
return fruitTemplate;
}
function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

var htmlTemplate = `
<html>
    <head>
        <title>
            ${title}
        </title>
            <meta name ="viewport" content = "width-device-width, initial-scale-1"/>
            <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class = "container">
                <div>
                    <a href= "/">Home</a>
                </div>
                <hr>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                   ${content}
                </div>
        </div>        
    </body>
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/orange', function (req, res) {
    //Make a select request
  //return the response with the results
   // pool.query("SELECT * FROM fruitprice where fruitName ='" +req.params.fname +"'", function(err,result){
      pool.query('SELECT * FROM fruitprice',function(err,result){
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
    //Make a select request
  //return the response with the results
   // pool.query("SELECT * FROM fruitprice where fruitName ='" +req.params.fname +"'", function(err,result){
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

var names = [];
app.get('/submit-name', function(req,res){
    //get the name from  request
     var name = req.params.name;
   //var name= req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/:prod', function(req,res){
//  Make a select request
 // return the response with the results
   // pool.query("SELECT * FROM fruitentry WHERE fruitgroup ='" +req.params.prod+"'", function(err,result){
       pool.query('SELECT * FROM fruitentry', function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length=== 0){
              res.status(404).send('fruit not found');
          }else{
               
               var fruitData =result.rows[1];
               res.send(create(fruitData));
                } 
     
          }

  });
  
});


app.get('/welcomeform', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'welcomeform.html'));
});


//app.get('/:prodName', function(req,res){
  //  var prodName = req.params.prodName;
    //    res.send(create(products[prodName]));  
//});

app.get('/prodsummary', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'prodsummary.html'));
});

app.get('/ui/main.js', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/articles/:articleName', function(req, res){
   // var articleName = req.params.articleName;
   //SELECT * FROM article where title = '\'; DELETE WHERE a = '\asd'
   pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName],function(err,result){
       if(err){
           res.status(500).send(err.toString());
      }else{
          if(result.rows.length=== 0){
              res.status(404).send('Article not found');
          }else{
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
      
   });
  
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
