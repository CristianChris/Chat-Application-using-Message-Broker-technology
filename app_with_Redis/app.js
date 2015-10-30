var WebSocketServer = require('ws').Server;
// To connect our Node.js application to the Redis server, we use the
// redis package (https://npmjs.org/package/redis), which is a complete
// client that supports all the available Redis commands. Next, we instantiate
// two different connections, one used to subscribe to a channel, the other to
// publish messages. This is necessary in Redis, because once a connection is
// put in subscriber mode only commands related to the subscription can be used.
// This means that we need a second connection for publishing messages.
var redis = require("redis");
var redisSub = redis.createClient();
var redisPub = redis.createClient();


// Static file server
// We first create an HTTP server and attach a middleware
// called ecstatic (https://npmjs.org/package/ecstatic) to serve
// static files. This is needed to serve the client-side resources
// of our application (JavaScript and CSS).
var server = require('http').createServer(
  require('ecstatic')({root: __dirname })
);
// We create a new instance of the WebSocket server and we
// attach it to our existing HTTP server. We then start
// listening for incoming WebSocket connections, by attaching
// an event listener for the connection event.
var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  console.log('Client connected');
  // Each time a new client connects to our server, we start l
  // istening for incoming messages. When a new message arrives,
  // we broadcast it to all the connected clients.
  ws.on('message', function(msg) {
    console.log('Message: ' + msg);
    // When a new message is received from a connected client,
    // we publish a message in the chat_messages channel. We don't
    // directly broadcast the message to our clients because our
    // server is subscribed to the same channel (as we will see in
    // a moment), so it will come back to us through Redis. For the
    // scope of this example, this is a simple and effective mechanism.
    redisPub.publish('chat_messages', msg);
  });
});

// As we said, our server also has to subscribe to the chat_messages channel,
// so we register a listener to receive all the messages published into that
// channel (either by the current server or any other chat server). When a
// message is received, we simply broadcast it to all the clients connected
// to the current WebSocket server.
redisSub.subscribe('chat_messages');
redisSub.on('message', function(channel, msg) {
wss.clients.forEach(function(client) {
    client.send(msg);
}); });


server.listen(process.argv[2] || 8080);
