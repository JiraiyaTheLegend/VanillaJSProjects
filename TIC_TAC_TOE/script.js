const cells = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restartBtn");
const statusText = document.querySelector('#status');

const winningScenarios = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let running = false;
let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = 'X';

const initialize = () =>{
    running = true;
    cells.forEach(cell => cell.addEventListener("click", clicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.innerHTML= `Current Player : ${currentPlayer}`;
}

function clicked(){ 
    index = this.getAttribute("cellIndex");
    if(options[index] !=""||!running)
        return;
    updateCell(this,index);
    checkWinner();  
}

function restartGame(){
    options = ["","","","","","","","",""];
    cells.forEach(cell=>cell.textContent="");
    currentPlayer = 'X';
    statusText.innerHTML = `Current Player : ${currentPlayer}`;
    running=true;
}

function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    changePlayer();
}
function checkWinner() {
  console.log('check winner block is executed')
    try {
      if (options.length !== 9) {
        console.error("Options array is not the correct length.");
        return;
      }
  
      for (let i = 0; i < winningScenarios.length; i++) {
        const scenario = winningScenarios[i];
        const cellA = options[scenario[0]];
        const cellB = options[scenario[1]];
        const cellC = options[scenario[2]];
        console.log(cellA+','+cellB+','+cellC);
        if (cellA != "" && cellB !="" && cellC != "") {
          if (cellA == cellB && cellB == cellC) {
            console.log('this block was executed ');
            changePlayer();
            statusText.textContent = `${currentPlayer} has won the game`;
            running = false;
          }
        }
  
        if (!options.includes("")) {
          statusText.textContent = "Tie between player X and player O";
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

function changePlayer(){
    currentPlayer = (currentPlayer =='X')? 'O' : 'X';
}
initialize();

