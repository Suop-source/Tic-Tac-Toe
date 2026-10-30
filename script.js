let cell = document.querySelectorAll(".cell");
let message = document.querySelector("#status");

let player1 = 1
let player2 = 2

gameover = false;
xFirst = true;

let board = [0, 0, 0, 0, 0, 0 ,0 ,0, 0];

const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ];

function checkDraw(){
    for (let i = 0; i < 9; i++){
        if (board[i] == 0){
            return true;
        }
    }
    return false;
}

function bot(){
    random = Math.floor(Math.random() * 5) * 2; // 0, 2, 4, 6, 8
    console.log(random);

    // if(board[4] == 0){
    //     board[4] = 2;
    // }
}

bot();


function reset() {
    for (let i = 0; i < 9; i++) 
        board[i] = 0;    

    message.innerHTML = "";

    cell.forEach((c) => {
        c.style.backgroundColor = "beige";
    });
}
document.getElementById("reset").addEventListener("click", reset);

function checkWin(type){
    let win = false;
    let draw = checkDraw();

    if(draw == false){
        // check rows
        for (let i = 0; i < 9; i+=3){
            if ((board[i] == type) && (board[i] == type) && (board[i] == board[i+1] && board[i+1] == board[i+2])){
                message.innerHTML = `Player ${type} wins!`;
                gameover = true;
                return win = true;
            }
        }

        // check columns
        for (let i = 0; i < 3; i++){
            if ((board[i] == type) && (board[i] == type) && (board[i] == board[i+3] && board[i+3] == board[i+6])){
                message.innerHTML = `Player ${type} wins!`;
                gameover = true;
                return win = true;
            }
        }

        // check diagonals (0, 4, 8)
        if (board[0] == type && board[0] == board[4] && board[4] == board[8]){
            message.innerHTML = `Player ${type} wins!`;
            gameover = true;
            return win = true;
        }

        // check diagonals (2, 4, 6)
        if (board[2] == type && board[2] == board[4] && board[4] == board[6]){
            message.innerHTML = `Player ${type} wins!`;
            gameover = true;
            return win = true;
        }
        
        return win;
    }
}

function clicked() {
    console.log("this.id: " + this.id);
    let index = this.id;

        if(xFirst) {
            if(board[index] == 0){
                board[index] = 1;
                this.style.backgroundColor = "red";
                checkWin(player1);
                xFirst = false;
            }
        } else {
            if(board[index] == 0){
                board[index] = 2;
                this.style.backgroundColor = "blue";
                checkWin(player2);
                xFirst = true;
            }
        }
}



// add event listener to each cell
cell.forEach((c) => {
        c.addEventListener("click", clicked);
            console.log("clicked");
});
