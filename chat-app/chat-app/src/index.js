const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const path = require('path');
const PORT = 3000;
const publicDirectory = path.join(__dirname,'../public');

app.use(express.static(publicDirectory));

//let count = 0;

io.on('connection',(socket)=>{
    console.log('new socket connection')

      socket.emit('message','welcome!');

 //   socket.emit('countUpdated',count);

    // socket.on('increment',()=>{
    //  count ++
    //  io.emit('countUpdated',count);
    // })
});

server.listen(PORT,()=>{
    console.log(`server listening to port ${PORT}`)
});