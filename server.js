
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.listen(3000)
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

let usersConnected = [];

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('user login', function (msg) {
    usersConnected.push(msg.userInfo);
    console.log('User joined ! Name:'+msg.userInfo.userName)
    console.log("Users connected:"+usersConnected.length);
    io.emit('scoreUpdateAll', usersConnected);
  });
  socket.on('scoreUpdate', function(msg) {
    for (let i = 0;i < usersConnected;i++) {
      let user = usersConnected[i]
      if (user.userInfo.userName == msg.userName) {
        user.score = msg.score;
        io.emit('scoreUpdateAll', usersConnected);
      }
    }
  })
});

