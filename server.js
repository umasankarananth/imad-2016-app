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

var prod={
    fruitId : 1,
     fruitName :  'apple',
     rate : 30

};

function create(dt){
    var fruitId = dt.fruitId;
    var fruitName =  dt.fruitName;
    var rate = dt.rate;

var prodTemplate =` 
<html>
<head>
  <title>CHESNUT FRUITS> </title>
         <meta name ="viewport" content = "width-device-width, initial-scale-1"/>
         <link href="/ui/style.css" rel="stylesheet" />
</head>  
 
 <body>
 <div class = "container">
     <div class = "center">
         <H2> ENTRY FORM</H2>
     </div>
         <a href="/">Home</a>
       <div align="right">
         <a href = "/welcomeform">Previous</a>         
         <a href= "/prodtransac">Next</a>
       </div>
       <hr/> 
     <div>
     <img src="https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/UR8AAOSw9NdXqFyw/$_35.JPG" class="img-medium" align="left"> 
     </div>
     <br>
     <div align = "right">
     <h3>Differnt Fruits In Our shop</h3>
      <table>
      <tr>
         <th>FRUITID </th><th> FRUITNAME</th><th>RATE</th>
      </tr>
      <tr>
          <td>${fruitId}</td>
          <td>${fruitName}</td>
          <td>${rate}</td>
      </table>
     
    </div>
</div>
</body>
</html>
 `;   
return prodTemplate;
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

var names = [];
app.get('/submit-name', function(req,res){
    //get the name from  request
     var name = req.params.name;
   //var name= req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

var pool = new Pool(config);
app.get('/fruitentry',function(req,res)
{
  //Make a select request
  //return the response with the results
    pool.query('SELECT * FROM fruitentry', function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result.rows));
      }
  });
  
});
//var fruitlist =[];
//app.get('/product-entry/', function(req,res){
//res.sendFile(path.join(__dirname, 'ui', 'product-entry.html'));
//  Make a select request
 // return the response with the results
  //  pool.query('SELECT * FROM fruitentry', function(err,result){
    //  if(err){
      //    res.status(500).send(err.toString());
      //}else{
        //  if(result.rows.length=== 0){
          //    res.status(404).send('fruit not found');
          //}else{
              
            //  var fruitData =result.rows[0];
             // fruitlist.push(fruitData);
              //res.send(JSON.stringify(fruitlist));
          //}
      
      //}
  //});
  
//});


app.get('/welcomeform', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'welcomeform.html'));
});

app.get('/:product-entry', function(req,res){
    //var prod = req.params.prod;
        res.send(create(prod));  
});


//app.get('/product-entry', function(req,res){
  //  res.sendFile(path.join(__dirname, 'ui', 'product-entry.html'));
//});

app.get('/prodtransac', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'prodtransac.html'));
});

app.get('/prodsummary', function(req,res){
  //  res.sendFile(path.join(__dirname, 'ui', 'prodsummary.html'));
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
