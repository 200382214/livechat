const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


io.attach(server);
io.on('connection', function(socket) {
  socket.on('postMessage', function(data) {
    io.emit('updateMessages', data);
  });
});
