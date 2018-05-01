/*@VinayKhedekar
  WebSocket program for chatterbox
  1. create websocket connection
  2. Send messages to all connected clients
  3. Notify all clients, If new topic is started
*/
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');
  // Send old messages to newly added clients
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data)

    /*check whether data contains the /topic string,
      If YES then consider its a start of new topic*/
    if (data.startsWith("/topic")) {
      var topicName = data.substring(7);
      var newClientMsg = "*** Topic is '" + topicName + "'";
      var connectedClientsMsg = "*** Topic has changed to '" + topicName + "'";
      /*push new messge at the begining of message array
       to notify new users about current topic*/
      messages.unshift(newClientMsg);

      //Notify connected users about topic change
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(connectedClientsMsg);
      });
    } else {
      //Save message to array
      messages.push(data);
      //Send new messages to all the users
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });
    }
  });
});
