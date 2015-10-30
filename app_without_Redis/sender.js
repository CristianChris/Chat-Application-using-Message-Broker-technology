var PORT = 33333;
var HOST = '127.0.0.1';
var fs = require('fs');
var dgram = require('dgram');
var client = dgram.createSocket('udp4');


fs.readFile('./index.xml','utf8', function (err, data) {
  if (err) throw err;
  var message = new Buffer(data);

  client.send(data, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
	});
});




