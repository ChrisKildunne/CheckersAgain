/*----- app's state (variables) -----*/
let currentPlayer;
let board;
const squares = document.querySelectorAll('.square');

/*----- cached element references -----*/

const boardEl = document.getElementById('gameboard');
const messageEl = document.querySelector('h2');
const playAgain = document.querySelector('button');

// Event listeners
playAgain.addEventListener('click', init);

/*----- functions -----*/
init()
function init() {
  board = [
    "", "red", "", "red", "", "red", "", "red",
    "red", "", "red", "", "red", "", "red", "",
    "", "red", "", "red", "", "red", "", "red",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "black", "", "black", "", "black", "", "black", "",
    "", "black", "", "black", "", "black", "", "black",
    "black", "", "black", "", "black", "", "black", ""
  ];
  currentPlayer = 'black';
  render();
}

function render() {
  renderBoard();
  validMove();
}

function renderBoard() {
  messageEl.innerHTML = `${currentPlayer.toUpperCase()} STARTS`;
  squares.forEach((square, idx) => {
    let pieceColor = board[idx];
    square.innerHTML = '';
    if (pieceColor === 'red') {
      const redPiece = document.createElement('div');
      redPiece.classList.add('red-piece');
      square.appendChild(redPiece);
    } else if (pieceColor === 'black') {
      const blackPiece = document.createElement('div');
      blackPiece.classList.add('black-piece');
      square.appendChild(blackPiece);
    }
  });
}

let clickedSquare = null;
let nextSquare = null;

function validMove() {
  squares.forEach((square) => {
    square.addEventListener('click', function (evt) {
      const clickedSquare = evt.target;
      console.log(clickedSquare)
      if (nextSquare && board[nextSquare.id]===currentPlayer) {
        const selectedPiece = parseInt(nextSquare.id);
        const validSquares = [];
        if(currentPlayer==='black'){
        if (board[selectedPiece - 7] === '') {
          validSquares.push(selectedPiece - 7);
        }
        if (board[selectedPiece - 9] === '') {
          validSquares.push(selectedPiece - 9);
        }
      } else if(currentPlayer==='red'){
        if (board[selectedPiece + 7] === '') {
          validSquares.push(selectedPiece + 7);
        }
        if (board[selectedPiece + 9] === '') {
          validSquares.push(selectedPiece + 9);
        }
      }
        if (validSquares.includes(parseInt(square.id))) {
          clickedSquare.innerHTML = nextSquare.innerHTML;//sets html of next square to the same as the last square
          nextSquare.innerHTML = '';//clears last square-piece from html
          nextSquare = null;
          board[parseInt(square.id)] =board[selectedPiece];//updates board array
          board[selectedPiece] = ''//updates board array
          jumpOver()
          getWinner();
          changePlayer();
          redKingMe(square.id);
          blackKingMe(square.id);
         
        }
      } else {
        nextSquare = clickedSquare;
      }      
    });
  });
}

function jumpOver() {
  squares.forEach((square) => {
    square.addEventListener('click', function (evt) {
      const clickedSquare = evt.target;
      console.log(clickedSquare)
      if (nextSquare && board[nextSquare.id]===currentPlayer) {
        const selectedPiece = parseInt(nextSquare.id);
        const validSquares = [];
        const opposingPlayerPiece = (selectedPiece + parseInt(clickedSquare.id)) / 2;
        let toRemove = document.querySelectorAll(".square");
       if (board[opposingPlayerPiece] !== '') {
        if (currentPlayer==='black'){
          if (board[selectedPiece - 14] === '') {
            validSquares.push(selectedPiece - 14);
          }
          if (board[selectedPiece - 18] === '') {
            validSquares.push(selectedPiece - 18);
          }
        } else if(currentPlayer==='red'){
          if (board[selectedPiece + 14] === '') {
            validSquares.push(selectedPiece + 14);
          }
          if (board[selectedPiece + 18] === '') {
            validSquares.push(selectedPiece + 18);
          }
        }
       }
        if (validSquares.includes(parseInt(square.id))) {
          clickedSquare.innerHTML = nextSquare.innerHTML;//sets html of next square to the same as the last square
          nextSquare.innerHTML = '';//clears last square-piece from html
          nextSquare = null;
          board[parseInt(square.id)] =board[selectedPiece];//updates board array
          board[selectedPiece] = ''//updates board array
          board[opposingPlayerPiece] = ''//updates board array
          toRemove[opposingPlayerPiece].innerHTML = ''//delete piece from html 
          changePlayer();
          redKingMe(square.id);
          blackKingMe(square.id);
        }
      } else {
        nextSquare = clickedSquare;
      }      
    });
  });
}



function redKingMe(squareID){
  let kingMeSquares=[56,58,60,62]
  if (kingMeSquares.includes(parseInt(squareID))){
    let kingId = document.querySelectorAll('.square')
   const redPieceK = kingId[squareID].firstChild;
   redPieceK.style.border ="3px dotted blue"
    alert('King Me')
    
  }
}
function blackKingMe(squareID){
  let kingMeSquares=[1,3,5,7]
  if (kingMeSquares.includes(parseInt(squareID))){
    let kingId = document.querySelectorAll('.square')
    const blackPieceK = kingId[squareID].firstChild;
    blackPieceK.style.border = "5px solid green"
    
    alert('King Me')
  }
}

function getWinner() {
  let redRemaining = false;
  let blackRemaining = false;

  board.forEach((piece) => {
    if (piece === 'red') {
      redRemaining = true;
    }
    if (piece === 'black') {
      blackRemaining = true;
    }
  });

  if (!redRemaining) {
    alert('Black Wins');
  } else if (!blackRemaining) {
    alert('Red Wins');
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === 'black' ? 'red' : 'black';
  messageEl.innerHTML = `${currentPlayer.toUpperCase()}'s Turn`;
}
