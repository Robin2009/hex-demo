var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')

var app = express();
var reload = require('reload');
var publicDir = path.join(__dirname, 'public')
 var app = express();
 app.get('/',function (req, res) {
     res.sendFile(path.join(publicDir, '/html/index.html'))
 })
 app.use(express.static(path.join(__dirname, 'public')));
 app.set('port',process.env.PORT || 3000)
 app.use(bodyParser.json())
 var server = http.createServer(app)

 //reload lapha
 reload(app);
 server.listen(app.get('port'),function () {
     console.log('Web server is now listening to the port: ' + app.get('port'))
 })