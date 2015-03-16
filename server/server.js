module.exports = function(httpServer) {
    
    var io = require('socket.io')(httpServer);
    
    var players = [],
        id = 0;
    
    io.on('connection', function (socket) {
        
      // Create new player
      players[id] = {id: id, x: 0, z: 0};
        
      // Emit to all already connected players
      socket.broadcast.emit('new', players[id]);
        
      // Warn new player about his own id and position
      socket.emit('imnew', players[id]);
        
      // Warn new player about other players online    
      for(i = 0; i < id; i++)
          socket.emit('new', players[i]);
        
      console.log('New player: ' + JSON.stringify(players[id++]));    
   
      socket.on('disconnect', function() {
        socket.broadcast.emit('off');
      });
      
      socket.on('pos', function (data) {
          
         var player = players[data.id];
          
         if(data.x) player.x += data.x;
         if(data.z) player.z += data.z;
          
         socket.broadcast.emit('pos', player);
         console.log('Emitting position: ' + JSON.stringify(player));    
      });
        
    });
    
    console.log('Socket ON!');
};