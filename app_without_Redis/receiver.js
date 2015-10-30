var PORT2 = 44444;
var HOST = '127.0.0.1';
var fs = require('fs');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var parser = require('xml2json');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP reciver listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
  var contentsJson = fs.writeFile("./recived_file.json", parser.toJson(message),
  function(error){
      if (error) {
        console.log("error writing");
       }
  console.log("File Json was saved");
    });
  var contentsXML = fs.writeFile("./recived_file.xml", message,
  function(error){
      if (error) {
        console.log("error writing");
       }
  console.log("File Xml was saved");
    });
});

server.bind(PORT2, HOST);
