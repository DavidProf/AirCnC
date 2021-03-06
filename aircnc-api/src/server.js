const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//web socket
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
//web socket
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('databaseConnectionHere', {
 useNewUrlParser:true,
 useUnifiedTopology:true
});

//use a database fast like raids...
const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
    
});
// "Global" variable connectedUsers
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(cors());

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));

app.use(routes);

server.listen(3000);
