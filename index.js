var express = require('express');
var bodyParser = require('body-parser');

var amqlib = require('./rabbit.js');
var app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('server started at port:3000'));
