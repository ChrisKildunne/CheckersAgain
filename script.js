/*----- app's state (variables) -----*/
let currentPlayer;
let board;
let validSquares;
let clickedSquare = null;
let nextSquare = null;
let selectedPiece;
let opposingPlayerPiece;
let doubleJumpAvailable=false;

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

/*validMove enables pieces to move one space diagnally*/
function validMove() {
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
          //dubJump()
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


/*jumpOver enables piece to jump over opponents pieces only if the move is legal
delete the opponents piece from the board*/
function jumpOver() {
  squares.forEach((square) => {
    square.addEventListener('click', function (evt) {
      const clickedSquare = evt.target;
      validSquares = [];
      
      if (nextSquare && board[nextSquare.id]===currentPlayer) {//only allows the correct player whos turn it is to move
        selectedPiece = parseInt(nextSquare.id);
       // console.log(selectedPiece)
        opposingPlayerPiece = (selectedPiece + parseInt(clickedSquare.id)) / 2;//calculating the id of the piece that is jumped
        if (
          (currentPlayer === 'black' && board[opposingPlayerPiece] === 'red') ||//guards against illegal jumps and jumping over your own piece 
          (currentPlayer === 'red' && board[opposingPlayerPiece] === 'black')
        ) {
        
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
          //jumpOverAvailable=true;
          clickedSquare.innerHTML = nextSquare.innerHTML;//sets html of next square to the same as the last square
          nextSquare.innerHTML = '';//clears last square-piece from html
          nextSquare = null;
          board[parseInt(square.id)] =board[selectedPiece];//updates board array
          board[selectedPiece] = ''//updates board array
          board[opposingPlayerPiece] = ''//updates board array
          squares[opposingPlayerPiece].innerHTML = ''//delete piece from html
          let updatedPiece = square.id
          console.log("yo:",updatedPiece)
          dubJump(updatedPiece);
         
          if (!doubleJumpAvailable) {
            changePlayer();
            dubJumpMessage.innerHTML =''
          }
          getWinner();
        }
      } else {
        nextSquare = clickedSquare;
        jumpOverAvailable = false;
      }
    });
  });
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
  messageEl.style.fontSize = '40px'
  messageEl.innerHTML = `Congratulations Black, You Win`;
} else if (!blackRemaining) {
  messageEl.style.fontSize = '40px'
  messageEl.style.color = 'red'
    messageEl.innerHTML = `Congratulations Red, You Win`;
  }
}
function changePlayer() {
    currentPlayer = currentPlayer === 'black' ? 'red' : 'black';
    messageEl.innerHTML = `${currentPlayer.toUpperCase()}'s Turn`;
  }

  function dubJump(updatedPiece) {
    console.log('this', updatedPiece);
    doubleJumpAvailable = false;
  
    if (currentPlayer === 'black') {

      const adjacentPieces = [
        board[updatedPiece - 7],
        board[updatedPiece - 9],
      ];
      const moveGuard = [
        updatedPiece - 7,
        updatedPiece - 9
      ]
     
      if (adjacentPieces.includes('red')) {
        console.log('again,', updatedPiece )
        if (
          (board[updatedPiece - 14] === '' && (updatedPiece - 14) > 0) ||
          (board[updatedPiece - 18] === '' && (updatedPiece - 18) > 0) 
        ) {
          console.log(board[updatedPiece]);
          doubleJumpAvailable = true;
          dubJumpMessage.innerHTML = "A double jump is available. Go ahead and take it!";
        }
      } 
    else {
        doubleJumpAvailable = false;
      }
    } else if (currentPlayer === 'red') {
      const adjacentPieces = [
        board[updatedPiece + 7],
        board[updatedPiece + 9],
      ];
      const moveGuard = [
        (updatedPiece + 7),
        (updatedPiece + 9)
      ]
      
      if (adjacentPieces.includes('black')) {
        if (
          (board[updatedPiece + 14] === '' && (updatedPiece + 14) < 65) ||
          (board[updatedPiece + 18] === '' && (updatedPiece + 18) < 65) 
        )  {
          doubleJumpAvailable = true;
          dubJumpMessage.innerHTML = "A double jump is available. Go ahead and take it!";
        }
      } 
    else {
        doubleJumpAvailable = false;
      }
    }
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