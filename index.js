const express=require('express');
const {createServer}=require('http');

const app=express();
const httpServer=createServer(app);
const SERVER_PORT = process.env.PORT || 3000;
const path = require('path');

const ion=require('socket.io')(httpServer,{
    cors:{
        origin:"*"
    }
});

const users={};
console.log("Hello")
ion.on('connection',socket=>{
    console.log("Server connected");
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.join("A1");
        socket.to("A1").emit('joined',name);
    });

    socket.on('user-exited',()=>{
        socket.to("A1").emit('leave',users[socket.id]);
        delete users[socket.id];
    });

    socket.on('send',message=>{
        socket.to("A1").emit('recieve',{message:message, name:users[socket.id]});
    });

});

app.use('/', express.static(path.join(__dirname, '')))

httpServer.listen(SERVER_PORT, () => console.log('Website open on http://localhost:3000'));

