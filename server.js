var express = require("express")
var app = express()
var server = require("http").createServer(app)
var io = require("socket.io").listen(server)
users = []
connections = []

console.log("server run");


app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

})
io.sockets.on("connection", function(socket) {

    connections.push(socket);
    console.log("connected: %s socket connected", connections.length);

    // off
    socket.on("disconnect", function(data) {

        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnect %s socket connect", connections.length);
    });
    // sent msg
    socket.on('send message', function(data) {
        console.log(data);
        io.sockets.emit('new message', { msg: data });

    })
});
server.listen(process.env.PORT || 3000)