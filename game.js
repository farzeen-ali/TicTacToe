let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');

let winningBlock = getComputedStyle(document.body).getPropertyValue('--winning-block');

let boxes = Array.from(document.getElementsByClassName('box'));

// console.log(boxes);

const O_Text = "O";
const X_Text = "X";

let currentPlayer = X_Text;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}
function boxClicked(e){
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (playerHasWon() !== false) {
            playerText.innerText = `${currentPlayer} has Won!!!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winningBlock)

            boxes.forEach(box => box.removeEventListener('click', boxClicked))

            return;
        }

        currentPlayer = currentPlayer == X_Text ? O_Text : X_Text;
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const chance of winningCombos) {
        let [a,b,c] = chance;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
restartBtn.addEventListener('click', restart);
function restart(){
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = ''
    });
    playerText.innerText = 'Tic Tac Toe';
    currentPlayer = X_Text;
    startGame();
}
startGame();