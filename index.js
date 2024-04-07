const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
           client.send(message + "hello world")
    });
    
  });
});

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(8000, () => console.log(`Lisening on port :8000`))