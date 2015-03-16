var socket = io('http://localhost:5000'),
    players = [];

function initNetwork() {
    
    socket.on('imnew', function(data) {
        
        game.hero.id = data.id;
        
        game.hero.position.x = data.x;
        game.hero.position.z = data.z;
        
        console.log('I am id ' + game.hero.id + '!');
    });
    
    socket.on('pos', function (data) {
        
        var player = players[data.id];
          
        player.position.x = data.x;
        player.position.z = data.z;
    });

    socket.on('new', function (data) {
        
        var newPlayer = new THREE.Mesh(new THREE.CubeGeometry(1,1,1), new THREE.MeshLambertMaterial({color: Math.random()*0xFF0000}));
				
        newPlayer.id = data.id;
        newPlayer.position.x = data.x;
        newPlayer.position.z = data.z;
        
        console.log('New player joined game: ' + JSON.stringify(data));
                
        players[newPlayer.id] = newPlayer;
        game.scene.add(newPlayer);        
    });

    socket.on('off', function() {
    //   var player = players[data.id];
    //   game.scene.remove(player);
    //   delete players[data.id];
    });
}