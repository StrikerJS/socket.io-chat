
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.listen(3000)
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

