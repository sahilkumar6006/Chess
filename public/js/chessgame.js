const socket = io();
const chess = new Chess(); 
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    console.log(board)
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex)=>{
    row.forEach((square, squareIndex)=>{
       const squareElement = document.createElement("div");
       squareElement.classList.add("square",
        (rowindex + squareindex) %2 === 0 ? "light" : "dark"
       )


       squareElement.dataset.row = rowIndex;
       squareElement.dataset.column = squareIndex;

       if(square){
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("piece", square.colo)
       }
    });
    })
};
const handleMove = () => {};
const getPieceUnicode = () => {};

renderBoard()