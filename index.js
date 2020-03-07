var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// basic configuration for the socket io app

// Routing to to index.html
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

// listening to our server port: 3000
http.listen(4000, function() {
   console.log('listening on localhost:4000');
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

let time = hours + ":" + minutes + ":" + seconds;



io.on('connection', function(socket) {
    console.log('A user has connected...');
    //logging data socket has been connected
    console.log('New Socket Create at: '+ year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    socket.on('disconnect', function(){
      console.log('A user has disconnected...')
    });
});


// adding users and emitting user has joined


var users = [];
io.on('connect', function(socket){

   // default username
   socket.username = "Anonymous"

   // setting the username for user
   socket.on('setUsername', function(data){
      socket.username = data;
      console.log(socket.username);

      if(socket.username !== "Anonymous")
      {
         console.log('username ')
          socket.broadcast.emit('userJoined', {username: socket.username})
      }
   });

   // getting new message
   socket.on('newMessage', (data) => {

        io.emit('newMessage', {message: data, username: socket.username, time: time});
        console.log('{ user: ' + socket.username + ' sent: ' + data + ' Time Sent: '+ time + '}');

   });
});


