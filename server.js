var express=require('express');
var app=express();
app.use(express.static('public'));

var web=require('./routes/web.js');
var admin=require('./routes/admin.js');

app.use('/',web);
app.use('/admin',admin);
app.set('view engine', 'ejs');
app.listen(3000);