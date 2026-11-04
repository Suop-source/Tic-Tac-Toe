let cell = document.querySelectorAll(".cell");
let message = document.querySelector("#status");
let mode = document.getElementById("modes");


let player1 = 1
let player2 = 2

gameover = false;
xTurn = true;
botStart = false;

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
            return false; // Returns true because there is still an empty cell
        }
    }
    return true; // else true because there are no empty cells left
}

/**
 * From AI i know, shame on me
 */
function findWinningMove(player) {
    // Loops through all patterns
    for (const pattern of winPatterns) {

        const [a, b, c] = pattern;

        // [player, player, empty]
        if (
            board[a] == player &&
            board[b] == player &&
            board[c] == 0
        ) {
            return c;
        }

        // [player, empty, player]
        if (
            board[a] == player &&
            board[b] == 0 &&
            board[c] == player
        ) {
            return b;
        }

        // [empty, player, player]
        if (
            board[a] == 0 &&
            board[b] == player &&
            board[c] == player
        ) {
            return a;
        }
    }

    return -1;
}

function bot(){
    let turn = findWinningMove(player2); // Check if bot can win

    if(turn == -1){
        // Do until a random empty cell is found
        do {
        turn = Math.floor(Math.random() * 5) * 2; // 0, 2, 4, 6, 8
        } while (board[turn] != 0);
    }

    board[turn] = 2;
    cell[turn].style.backgroundColor = "blue";

    checkWin(player2);
    xTurn = true;
}


function reset() {
    xTurn = true;
    gameover = false;
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
    message.innerHTML = "Draw!";
    gameover = true;
}

function clicked() {
    console.log("this.id: " + this.id); // Prints out the id of the clicked cell
    let index = this.id;
    if(!gameover){
        if(mode.value == "2-player"){
                if(xTurn) {
                    if(board[index] == 0){
                        board[index] = 1;
                        this.style.backgroundColor = "red";
                        checkWin(player1);
                        xTurn = false;
                    }
                } else {
                    if(board[index] == 0){
                        board[index] = 2;
                        this.style.backgroundColor = "blue";
                        checkWin(player2);
                        xTurn = true;
                    }
                }
            } else {
                if(xTurn) {
                    if(board[index] == 0){
                        board[index] = 1;
                        this.style.backgroundColor = "red";
                        checkWin(player1);
                        if(!gameover)   {
                            xTurn = false; 
                            bot();
                        }
                    }
                } 
            }
        } else {
            alert("Game is over! Please reset the game to play again.");
            return; 
        }
}

// add event listener to each cell
cell.forEach((c) => {
    c.addEventListener("click", clicked);
    console.log("clicked");
});