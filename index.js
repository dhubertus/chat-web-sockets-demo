var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.emit('add/remove to online', socket.id)
  socket.broadcast.emit('status', `${socket.id} has connected`);
  socket.on('disconnect', function(msg){
    console.log('user disconnected');
    io.emit('add/remove to online', socket.id)
    socket.broadcast.emit('status', `${socket.id} has disconnected`);
  });
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
  socket.on('user typing', function() {
    socket.broadcast.emit('typing', 'Someone is typing!')
  })
  socket.on('say to someone', (id, msg) => {
    // send a private message to the socket with the given id
    socket.to(id[0]).emit('private message', 'this is a private message');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.emit('some event', { for: 'everyone' });
