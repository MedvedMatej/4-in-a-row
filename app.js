let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 850;

let board = Array.from(Array(6), () => Array(7).fill(null));
let turn = 'red';
drawBoard();

function insertPiece(col, color) {
    for (let i = 5; i >= 0; i--) {
        if (board[i][col] === null) {
        board[i][col] = color;
        clearPreview();
        drawToken(col, i, color);
        return true;
        }
    }
    return false;
}

canvas.addEventListener('click', playTurn);
canvas.addEventListener('mousemove', preview);

function playTurn(e){
    let x = e.offsetX;
    let col = Math.floor(x*7 / canvas.width);
    if(insertPiece(col, turn)){
        if (isFinished(board)) {
            canvas.removeEventListener('click', playTurn);
            canvas.removeEventListener('mousemove', preview);
            alert(`${turn} wins!`);
        }
        turn = turn==='red' ? 'yellow' : 'red';
    }
}

function preview(e){
    let x = e.offsetX;
    previewToken(x,turn);
}

//is game finished?
function isFinished(board) {
    //check columns
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (board[i][j] === null) {
                continue;
            }
            if(board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j]){
                return board[i][j];
            }
        }
    }
    //check rows
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === null) {
                continue;
            }
            if(board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2] && board[i][j] === board[i][j+3]){
                return board[i][j];
            }
        }
    }
    //check diagonal
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === null) {
                continue;
            }
            if(board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3]){
                return board[i][j];
            }
        }
    }
    //check other diagonal
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === null) {
                continue;
            }
            if(board[i][j] === board[i-1][j+1] && board[i][j] === board[i-2][j+2] && board[i][j] === board[i-3][j+3]){
                return board[i][j];
            }
        }
    }

    if(board[0].includes(null)){
        return false;
    }

    return "tie";
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3333ff';
    ctx.fillRect(0, canvas.height/7, canvas.width, canvas.height);
    /* for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(i*canvas.width/7, canvas.height/7);
        ctx.lineTo(i*canvas.width/7, canvas.height);
        ctx.stroke();
    }
    for (let i = 1; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i*canvas.height/7);
        ctx.lineTo(canvas.width, i*canvas.height/7);
        ctx.stroke();
    } */

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            ctx.shadowBlur = 7;
            ctx.shadowColor = "black";
            drawToken(j, i, "#0000ff",-6);
            drawToken(j, i, "#e1e1e1");

            ctx.shadowBlur = 0;
        }
    }
}

function drawToken(col, row, color, margin = 0) {
    if(color == "yellow") color = "#fce12d";
    ctx.beginPath();
    ctx.arc(col*canvas.width/7 + canvas.width/14, (row+1)*canvas.height/7 + canvas.height/14, (canvas.width/14)-15-margin, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
}

function previewToken(x,color){
    let secondaryColor;
    if(color == "yellow"){ 
        color = "#fce12d";
        secondaryColor = "#f2cc0f";
    }
    else{
        secondaryColor = "#d10000";
    }

    clearPreview();
    
    ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.arc(x, canvas.height/14, (canvas.width/14)-8, 0, Math.PI*2);
    ctx.fillStyle = secondaryColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, canvas.height/14, (canvas.width/14)-15, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowBlur = 0;
}

function clearPreview(){
    ctx.clearRect(0, 0, canvas.width, canvas.height/7);
}

function reset(){
    board = Array.from(Array(6), () => Array(7).fill(null));
    turn = 'red';
    drawBoard();
    canvas.addEventListener('click', playTurn);
    canvas.addEventListener('mousemove', preview);
}