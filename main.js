var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname)));

app.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/move',(req,res)=>{
  console.log("received AJAX call");
  var moves = ["u","r","d","l"];//up right down left
  res.send(moves[Math.floor(Math.random()*moves.length)]);
});



app.listen(3000, function(){
  console.log("started listening on port 3000");
});
