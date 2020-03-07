var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;

// listening to our server port: 3000
http.listen(port, function() {
    console.log('listening on localhost:3000');
 });

 app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
 });
 app.get('/javascript', function(req, res) {
    res.sendFile(__dirname + '/public/javascript.html');
 });
 app.get('/swift', function(req, res) {
    res.sendFile(__dirname + '/public/swift.html');
 });
 app.get('/python', function(req, res) {
    res.sendFile(__dirname + '/public/python.html');
 });

 let date_ob = new Date();
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();

const tech = io.of('/tech');

tech.on('connection', function(socket) {

   socket.username = "anonymous"

    console.log('A user has connected...');
    //logging data socket has been connected
    console.log('New Socket Create at: '+ year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    socket.on('setUsername', function(data){
      socket.username = data;
      console.log(socket.username);

    });
    socket.on('join', data => {
         console.log(socket.username);
        socket.join(data.room);
        tech.in(data.room).emit('message', socket.username + ' has Joined  ' + data.room + ' room!');
    });
    socket.on('message', (data) => {

        tech.in(data.room).emit('message', data.msg);

    });
    socket.on('disconnect', function(){
      console.log('A user has disconnected...')
      tech.emit('message', socket.username + 'User Disconnected');
    });
});
  