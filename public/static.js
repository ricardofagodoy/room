var http = require('http'),
    fs = require('fs'),
    porta = 5000,
    rootPath = __dirname;//process.cwd();

var server = http.createServer(function(req, res) {
    
    var fileName = rootPath + (req.url == '/' ? '/index.html' : req.url);
    
    console.log('Request for ' + fileName);
    
    var rs = fs.createReadStream(fileName);   
    
    res.writeHead(200);
    rs.pipe(res); 
    
    rs.on('error', function() {
        res.writeHead(404);
        res.end();
    });
});

server.listen(porta);

console.log('Paginas estaticas (5000): ON!');

module.exports = server;