/*----- app's state (variables) -----*/
let currentPlayer;
let board;
let validSquares;
let clickedSquare = null;
let nextSquare = null;
let selectedPiece;
let opposingPlayerPiece;
let gameOver= false;
let emptySquares;
let jumpOverAvailable

/*----- cached element references -----*/
const squares = document.querySelectorAll('.square');
const boardEl = document.getElementById('gameboard');
const messageEl = document.querySelector('h2');
const playAgain = document.querySelector('button');
const dubJumpMessage = document.querySelector('h3')


// Event listeners
playAgain.addEventListener('click', init);

/*----- functions -----*/
init()
function init() {
  board = [
    "illegal", "red", "illegal", "red", "illegal", "red", "illegal", "red",
    "red", "illegal", "red", "illegal", "red", "illegal", "red", "illegal",
    "illegal", "red", "illegal", "red", "illegal", "red", "illegal", "red",
    "", "illegal", "", "illegal", "", "illegal", "", "illegal",
    "illegal", "", "illegal", "", "illegal", "", "illegal", "",
    "black", "illegal", "black", "illegal", "black", "illegal", "black", "illegal",
    "illegal", "black", "illegal", "black", "illegal", "black", "illegal", "black",
    "black", "illegal", "black", "illegal", "black", "illegal", "black", "illegal"
  ];
  currentPlayer = 'black';
  gameOver = false;
  render();
}

function render() {
  renderBoard();
  validMove();
  renderControls();
}
function renderControls(){
  playAgain.style.visibility = gameOver ? 'visible' : 'hidden';
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

/*validMove enables pieces to move one space diagnally*/
function validMove() {
  if(!gameOver){
  squares.forEach((square) => {
    square.addEventListener('click', function (evt) {
      clickedSquare = evt.target;
      validSquares=[]
      console.log(clickedSquare)
      if (nextSquare && board[nextSquare.id]===currentPlayer) {
        selectedPiece = parseInt(nextSquare.id);
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
          changePlayer();
          getWinner();
       }
      } else {
        nextSquare = clickedSquare;
        }      
    });
  });
}
}



/*jumpOver enables piece to jump over opponents pieces only if the move is legal
delete the opponents piece from the board*/
function jumpOver() {
  let jumpOverAvailable = false;

  squares.forEach((square) => {
    square.addEventListener('click', function (evt) {
      const clickedSquare = evt.target;
      validSquares = [];

      if (nextSquare && board[nextSquare.id] === currentPlayer) {
        selectedPiece = parseInt(nextSquare.id);
        opposingPlayerPiece = (selectedPiece + parseInt(clickedSquare.id)) / 2;

        if (
          (currentPlayer === 'black' && board[opposingPlayerPiece] === 'red') ||
          (currentPlayer === 'red' && board[opposingPlayerPiece] === 'black')
        ) {
          if (currentPlayer === 'black') {
            if (board[selectedPiece - 14] === '' && (selectedPiece - 14 > 0)) {
              validSquares.push(selectedPiece - 14);
            }
            if (board[selectedPiece - 18] === '' && (selectedPiece - 18 > 0)) {
              validSquares.push(selectedPiece - 18);
            }
          } else if (currentPlayer === 'red') {
            if (board[selectedPiece + 14] === '' && (selectedPiece + 14 < 64)) {
              validSquares.push(selectedPiece + 14);
            }
            if (board[selectedPiece + 18] === '' && (selectedPiece + 18 < 64)) {
              validSquares.push(selectedPiece + 18);
            }
          }
        }

        if (validSquares.includes(parseInt(square.id))) {
          clickedSquare.innerHTML = nextSquare.innerHTML;
          nextSquare.innerHTML = '';
          nextSquare = null;
          board[parseInt(square.id)] = board[selectedPiece];
          board[selectedPiece] = '';
          board[opposingPlayerPiece] = '';
          squares[opposingPlayerPiece].innerHTML = '';

          let updatedPiece = parseInt(square.id);
          dubJump(updatedPiece);
          getWinner();
        }
      } else {
        nextSquare = clickedSquare;
      }
    });
  });
}
function dubJump(updatedPiece) {
  
  jumpOverAvailable = false;
  emptySquares = [];
  const frontPiece9 = currentPlayer === 'black' ? board[updatedPiece - 9] : board[updatedPiece + 9];
  const frontPiece7 = currentPlayer === 'black' ? board[updatedPiece - 7] : board[updatedPiece + 7];
  const opposingPiece = currentPlayer === 'black' ? 'red' : 'black';

  if (currentPlayer === 'black') {
    if (updatedPiece - 14 > 0 && board[updatedPiece - 14] === ''&& frontPiece7 === opposingPiece) {
      emptySquares.push(updatedPiece - 14);
    }
    if (updatedPiece - 18 > 0 && board[updatedPiece - 18] === ''&&frontPiece9 === opposingPiece) {
      emptySquares.push(updatedPiece - 18);
    }
  } else if (currentPlayer === 'red') {
    if (updatedPiece + 14 < 64 && board[updatedPiece + 14] === ''&&frontPiece7 === opposingPiece) {
      emptySquares.push(updatedPiece + 14);
    }
    if (updatedPiece + 18 < 64 && board[updatedPiece + 18] === ''&&frontPiece9 === opposingPiece) {
      emptySquares.push(updatedPiece + 18);
    }
  }
  
  if (emptySquares.length > 0) {
    jumpOverAvailable = true;
    dubJumpMessage.innerHTML = 'You have a another jump available go ahead and take it!'
  }

  if (!jumpOverAvailable) {
    changePlayer();
    dubJumpMessage.innerHTML = ''
  }
}
function getWinner() {
  let redRemaining = false;
  let blackRemaining = false;
  let blackMovesLeft = false;
  let redMovesLeft = false;

  board.forEach((piece, idx) => {
    if (piece === 'red') {
      redRemaining = true;
      if (board[idx + 7] === '' || board[idx + 9] === '') {
        redMovesLeft = true;
      }
    } else if (piece === 'black') {
      blackRemaining = true;
      if (board[idx - 7] === '' || board[idx - 9] === '') {
        blackMovesLeft = true;
      }
    }
  });

  if (!redRemaining) {
    gameOver = true;
    messageEl.style.fontSize = '40px';
    messageEl.innerHTML = `Congratulations Black, You Win. Press PlayAgain if you would like to play again!`;
    gameOver=true;
  } else if (!blackRemaining) {
    gameOver = true;
    messageEl.style.fontSize = '40px';
    messageEl.style.color = 'red';
    messageEl.innerHTML = `Congratulations Red, You Win. Press PlayAgain if you would like to play again!`;
    gameOver=true;
  } else if (!redMovesLeft) {
    gameOver = true;
    messageEl.style.fontSize = '40px';
    messageEl.innerHTML = `Black Wins by Default. Press PlayAgain if you would like to play again!`;
    gameOver=true;
  } else if (!blackMovesLeft) {
    gameOver = true;
    messageEl.style.fontSize = '40px';
    messageEl.innerHTML = `Red Wins by Default. Press PlayAgain if you would like to play again!`;
    gameOver=true;
  } else if (!redMovesLeft && !blackMovesLeft) {
    gameOver = true;
    messageEl.style.fontSize = '40px';
    messageEl.innerHTML = `It's a Tie. Press PlayAgain if you would like to play again!`;
    gameOver=true;
  }
  renderControls();
}

function changePlayer() {
    currentPlayer = currentPlayer === 'black' ? 'red' : 'black';
    messageEl.innerHTML = `${currentPlayer.toUpperCase()}'s Turn`;
  }

   
// function redKingMe(squareID) {
//   let kingMeSquares = [56, 58, 60, 62]; // IDs of red king me's
//   if (kingMeSquares.includes(parseInt(squareID))) {
//     let kingId = document.querySelectorAll('.square');
//     const redPieceK = kingId[squareID].firstChild;
//     redPieceK.style.border = "3px dotted blue";
//     const validSquares = [];

//     const selectedPiece = parseInt(squareID);
//     const opposingPlayerPiece = (selectedPiece + parseInt(clickedSquare.id)) / 2;
//     if (board[selectedPiece - 7] === '') {
//       validSquares.push(selectedPiece - 7);
//     }
//     if (board[selectedPiece - 9] === '') {
//       validSquares.push(selectedPiece - 9);
//     }
//     if (board[selectedPiece + 7] === '') {
//       validSquares.push(selectedPiece + 7);
//     }
//     if (board[selectedPiece + 9] === '') {
//       validSquares.push(selectedPiece + 9);
//     }
//     if (board[opposingPlayerPiece] !== '') {
//       if (board[selectedPiece - 14] === '') {
//         validSquares.push(selectedPiece - 14);
//       }
//       if (board[selectedPiece - 18] === '') {
//         validSquares.push(selectedPiece - 18);
//       }
//       if (board[selectedPiece + 14] === '') {
//         validSquares.push(selectedPiece + 14);
//       }
//       if (board[selectedPiece + 18] === '') {
//         validSquares.push(selectedPiece + 18);
//       }
//     }
//     if (validSquares.includes(parseInt(square.id))) {
//       clickedSquare.innerHTML = kingId[squareID].innerHTML;
//       kingId[squareID].innerHTML = '';
//       board[parseInt(square.id)] = board[selectedPiece];
//       board[selectedPiece] = '';
//       board[opposingPlayerPiece] = '';
//       toRemove[opposingPlayerPiece].innerHTML = '';
//       changePlayer();
//       getWinner();
//     }

//     alert('King Me');
//   }
// }

// function blackKingMe(squareID){
//   let kingMeSquares=[1,3,5,7]
//   if (kingMeSquares.includes(parseInt(squareID))){
//     let kingId = document.querySelectorAll('.square')
//     const blackPieceK = kingId[squareID].firstChild;
//     blackPieceK.style.border = "5px solid green"
    
//     alert('King Me')
//   }
// }