var express = require('express');
var app = express();
var port = 3000;
var mongoose=require('./db.js');
var rabbit=require('./rabbit.js');

console.log('_-----------------------------');


console.log('_-----------------------------');
app.listen(port);
app.use('/',rabbit);
