const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {Chess} = require('chess.js');
const path = require('path');
const { title } = require('process');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess= new Chess();
let players = {};
let currentPlayer = 'W';

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res) {
    res.render("index", {title: 'Chess Game'});
});

io.on("connection", function (uniquesocket) {
console.log("connected");
// uniquesocket.on("churan", function(){
//     console.log("churan received");
//     io.emit("churan papdi")

uniquesocket.on('disconnect', function() {
    console.log("disconnected");

    if(!players.white){
        players.white = uniquesocket.id;
        socket.emit("playerRole", "w")
    }
    else if(players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole","b")
    }else{
        uniquesocket.emit("spectorRole");
    }

    uniquesocket.on("disconnect", function(){
        if(uniquesocket.id === players.white){
            delete players.white;
        }else if(uniquesocket.id === players.black){
            delete players.black;
        }
    })


    uniquesocket.on("move", (move)=>{
        try {
            if(chess.turn() === 'w' && uniquesocket.id !== players.white) return;
            if(chess.turn() === 'b' && uniquesocket.id !== players.black) return;

            const result = chess.move(move);
            if(result){
                currentPlayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen());
            }else {
                console.log("invalid move :", move);
                uniquesocket.emit(move);
            }
      
        } catch (error) {
            console.log("error", error);
            console.log("error", error);
            uniquesocket.emit("Invalid move :", move);
        }
    })
})
    
})


server.listen(3000, function () {
    console.log("listening on port 3000");
})


