const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const cells = document.querySelectorAll(".cells");
//Containes the moves played in all the columns initially it's all empty
let cellValue = [
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", ""
];
let running = false;
// X represents player red , O repersents player blue as this is just complicated tic tac toe
let player = "X";
initializeGame();

function initializeGame() {
    running = true;
    cells.forEach(element => element.addEventListener("click", clicked));
    restartBtn.addEventListener("click", restart);
    console.log('initialization succesful');
}

function clicked() {
    const columnNo = this.getAttribute("data-columnNo");
    const column = document.querySelectorAll(`[data-columnNo="${columnNo}"]`);
    let cell = cellToBeColored(column);
    if (!running)
        return;
    if (cell != -1) {
        colorCell(cell, player);
        cellValue[cell] = player;
        if(checkWinner())
            return;
        changePlayer();
        updateStatusText();

    }
    else {
        statusText.textContent = "Column is full try again";
    }
}

function checkWinner() {
    console.log("checkWinner function is working");
    let prev = "X";
    let matchCount = 0;
    for ( i = 0; i < 42; i++) {
        if (cellValue[i] === prev && cellValue[i] != "") {
            matchCount++;
        }
        else {
            prev = cellValue[i];
            matchCount = 0;
        }
        if (matchCount == 3) {
            console.log("Well someone has wo");
            running = false;
            statusText.textContent =  (player === "X")? `red has won the game` : 'Blue has won the game';
            return true;
        }
    }
    
     prev = "X";
     matchCount = 0;
    for(j=0;j<7;j++){
        for ( i = j; i < 42; i+=7) {
            if (cellValue[i] === prev && cellValue[i] != "") {
                matchCount++;
            }
            else {
                prev = cellValue[i];
                matchCount = 0;
            }
            if (matchCount == 3) {
                console.log("Well someone has won");
                running = false;
                statusText.textContent =  (player === "X")? 'red has won the game' : 'Blue has won the game';
                return true;
            }
        }
    }

    for(j = 0;j<42;j++){
        for ( i = j; i < 42; i+=8) {
            if (cellValue[i] === prev && cellValue[i] != "") {
                matchCount++;
            }
            else {
                prev = cellValue[i];
                matchCount = 0;
            }
            if (matchCount == 3) {
                console.log("Well someone has won");
                running = false;
                statusText.textContent =  (player === "X")? 'red has won the game' : 'Blue has won the game';
                return true;
            }
        }
    }

     for(j = 0;j<42;j++){
        for ( i = j; i < 42; i+=6) {
            if (cellValue[i] === prev && cellValue[i] != "") {
                matchCount++;
            }
            else {
                prev = cellValue[i];
                matchCount = 0;
            }
            if (matchCount == 3) {
                console.log("Well someone has won");
                running = false;
                statusText.textContent =  (player === "X")? 'red has won the game' : 'Blue has won the game';
                return true;
            }
        }
    }

}

function restart() {
    running = true;
    cellValue = [
        "", "", "", "", "", "", "",
        "", "", "", "", "", "", "",
        "", "", "", "", "", "", "",
        "", "", "", "", "", "", "",
        "", "", "", "", "", "", "",
        "", "", "", "", "", "", ""
    ];
    const elements = document.querySelectorAll(".cells").forEach(element => element.style.backgroundColor = "#849483");
}

function colorCell(index, colorCode) {
    const cell = document.querySelector(`[cellIndex="${index}"]`);
    cell.style.backgroundColor = (colorCode === "X") ? "red" : "blue";
}
function changePlayer() {
    player = (player === "X") ? "O" : "X";
}
function updateStatusText() {
    statusText.textContent = (player === "X") ? "It's red's turn" : "It's blue's turn";
}
function cellToBeColored(array) {
    for (i = 6; i >= 0; i--) {
        let index;
        value = array[i];
        if (value != null) {
            index = array[i].getAttribute("cellIndex");
        }
        if (cellValue[index] === "") {
            return index;
        }
    }
    return -1;
}