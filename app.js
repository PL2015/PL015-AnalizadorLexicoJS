var _ = require('underscore');
var $ = require('jquery');
var express = require('express');

var app = express();

module.exports = app;

var path = require('path');
var expressLayouts = require('express-ejs-layouts');

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static(__dirname + '/'));

app.get('/', function (request, response) {
   response.render('index', { title: 'Analiz. Lex. JS' });
});

app.listen(app.get('port'), function () {
   console.log("Node app is running at localhost:" + app.get('port'));
});

app.get('/test/', function (request, response) {
   response.render('test', { title: 'Analiz. Lex. JS test' });
});


var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;
   
   console.log('Ex app list at https://%s:%s', host, port);


});
