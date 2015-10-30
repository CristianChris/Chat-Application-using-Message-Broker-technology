var PORT1 = 33333;
var PORT2 = 44444;
// var PORT3 = 55555; 
//127.0.0.1
var HOST = '127.0.0.1';
var fs = require('fs');
var dgram = require('dgram');
var broker = dgram.createSocket('udp4');

broker.on('listening', function () {
    var address = broker.address();
    console.log('UDP broker listening on ' + address.address + ":" + address.port);
});

broker.on('message', function (message, remote) {
  broker.send(message, 0, message.length, PORT2 , HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT2);
    broker.close();
  });
    console.log(remote.address + ':' + remote.port +' - ' + message);
});

broker.bind(PORT1, HOST);
