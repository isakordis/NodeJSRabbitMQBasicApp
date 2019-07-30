var express = require('express');
var app = express();
var port = 3000;
var mongoose=require('./db.js').Mong;
var amqp=require('./rabbit.js');

console.log('_-----------------------------');
console.log(mongoose);
console.log('_-----------------------------');
// console.log(amqp);
console.log('_-----------------------------');
console.log(port);
console.log('_-----------------------------');



  app.get('/',function(req,res){

    res.sendfile(__dirname+'/index.html');
  });
    



app.use('/',amqp);
app.listen(port);
