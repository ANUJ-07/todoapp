var express = require('express');
var app = express()

var todocontroller = require('./controller/todocontroller');

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todocontroller(app);

app.listen(3000);
console.log('Now listening to 3000 port.');