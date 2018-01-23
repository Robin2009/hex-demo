var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')

var app = express();
var reload = require('reload');
var publicDir = path.join(__dirname, 'public')
 var app = express();


 app.use(express.static(publicDir));
 app.use(bodyParser.json())

 app.get('/',function (req, res) {
     res.sendFile(path.join(publicDir, '/html/login.html'))
 })
 
 app.set('port',process.env.PORT || 3000)
 var server = http.createServer(app)

 //reload lapha
 reload(app);
 server.listen(app.get('port'),function () {
     console.log('Web server is now listening to the port: ' + app.get('port'))
 })