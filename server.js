var express = require("express");
var path    = require('path');
var fs      = require('fs');

const PORT  = 8080;
var app     = express().use(express.static(__dirname));
var server  = app.listen(PORT, function(){
  console.log('Server started on port 8080');
});
var io      = require('socket.io')(server);

var numDemos;
io.on('connection', function(socket){
  console.log('a user connected');
  fs.readdir('demos', function (err, files) {
    if (err){
      console.log("Improper demos folder.")
      throw err;
    }
    numDemos = 0;
    for (var i in files) {
      if(files[i].substr(0,4) === "demo" && files[i].substr(-3,3) === ".js")
        numDemos++;
     }
  });
  socket.on( 'getNumDemos', () => { io.emit('numDemos', numDemos); } );
  socket.on( 'disconnect', () => { console.log('user disconnected'); } );
});
