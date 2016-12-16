var express = require("express");
var request = require("request");


var app = express();

// Put your Edamam APP_ID here
var app_id = "dfbc2e6f";

// PUT YOUR Edmam API_KEY here
var api_key = "6cdbf16c1252f300621dd8a447663f69";

// This will serve up any static files in the public folder
app.use(express.static('public'));


// This allows Cross-Origin Requests to our server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Make sure everything works right
/*app.get('/', function(req, res){
    res.send("Hello world");
});*/

// Make a get call to the edamam api
// Make sure you set app_key and api_key up above
app.get('/api/nutrition/:ingr', function(req, res){
    var responseData;
    request(
      { method: 'GET'
      , uri: 'https://api.edamam.com/api/nutrition-data?app_id=' + app_id + '&app_key=' + api_key + '&ingr=' + req.params.ingr
      , gzip: true
      }
    , function (error, response, body) {
        // body is the decompressed response body
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
        console.log('the decoded data is: ' + body);
        res.json(body);
    });
 
});

app.listen(process.env.PORT || 5000, function(){
    console.log("Example app listening on port 3000!");
})