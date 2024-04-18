const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (userName) => {
    users.push({ name: userName, id: socket.id });
    console.log('User ' + userName + 'with ' + socket.id + ' join to the chat room')
    socket.broadcast.emit('newUser', userName);
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected! Its id – ' + socket.id);
    const index = users.findIndex(user => user.id === socket.id);
    if (index !== -1) {
      socket.broadcast.emit('userLeft', users[index].name);
      users.splice(index, 1);
      console.log('Current users:', users);
    }
  });

});

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.json());

const messages = [];
const users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
