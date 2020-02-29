var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// basic configuration for the socket io app
app.get('/', function(req, res) {
   res.sendfile('index.html');
});
http.listen(3000, function() {
   console.log('listening on localhost:3000');
});