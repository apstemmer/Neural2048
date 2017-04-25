const http = require('http');
var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname)));

app.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/move',(req,res)=>{
  console.log("received AJAX call");
  res.send("55");
});

app.listen(3000);
