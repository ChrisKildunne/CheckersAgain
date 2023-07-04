/*----- app's state (variables) -----*/
let currentPlayer;
let board;
const squares = document.querySelectorAll('.square');


/*----- cached element references -----*/
const boardEl = document.getElementById('gameboard');
const messageEl = document.querySelector('h1')
const playAgain = document.querySelector('button');

//event listeners
playAgain.addEventListener('click', init)
/*----- functions -----*/
init();

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
  currentPlayer = 'Black';
  render();
  //alert('black always starts');
}

function render() {
  renderBoard();
  renderMove();
}



function renderBoard() {
 squares.forEach(square => {
  square.innerHTML = ''
 })//clears the board for in
  squares.forEach((square, idx) => {
   let pieceColor = board[idx];
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


let clickedSquare=null;
let nextSquare = null;

function renderMove(){
  validMove();
  //playerJump();
}

function validMove() {
  squares.forEach(square => {
    square.addEventListener('click', function(evt) {
      const clickedSquare = evt.target;
     
      if (nextSquare) {
        //console.log(nextSquare)
        const selectedPiece = parseInt(nextSquare.id);
        const validSquares = [];
        if (board[selectedPiece - 7] === '') {
          validSquares.push(selectedPiece - 7);
        }
        if (board[selectedPiece - 9] === '') {
          validSquares.push(selectedPiece - 9);
        }
        if (board[selectedPiece + 7] === '') {
          validSquares.push(selectedPiece + 7);
        }
        if (board[selectedPiece + 9] === '') {
          validSquares.push(selectedPiece + 9);
        }
        if (board[selectedPiece - 14] === '') {
          validSquares.push(selectedPiece - 14);
        }
        if (board[selectedPiece - 18] === '') {
          validSquares.push(selectedPiece - 18);
        }
        if (board[selectedPiece + 14] === '') {
          validSquares.push(selectedPiece + 14);
        }
        if (board[selectedPiece + 18] === '') {
          validSquares.push(selectedPiece + 18);
        }
        if (validSquares.includes(parseInt(clickedSquare.id))) {
          clickedSquare.innerHTML = nextSquare.innerHTML;
          nextSquare.innerHTML = '';
          nextSquare = null;
          const opposingPlayerPiece = (selectedPiece + parseInt(clickedSquare.id)) / 2;
          let toRemove = document.querySelectorAll(".square");
          toRemove[opposingPlayerPiece].innerHTML = '';
  
         
        } 
      } else {
        nextSquare = clickedSquare;
      }
      changePlayer();
      getWinner(); 
    });
  });
}


// function playerJump() {
//   squares.forEach(square => {
//     square.onclick = function(evt) {
//       const clickedSquare = evt.target;
//       if (nextSquare) {
//         const selectedPiece = parseInt(nextSquare.id);
//         const validSquares = [];

//         if (board[selectedPiece - 14] === '') {
//           validSquares.push(selectedPiece - 14);
//         }
//         if (board[selectedPiece - 18] === '') {
//           validSquares.push(selectedPiece - 18);
//         }
//         if (board[selectedPiece + 14] === '') {
//           validSquares.push(selectedPiece + 14);
//         }
//         if (board[selectedPiece + 18] === '') {
//           validSquares.push(selectedPiece + 18);
//         }
//         if (validSquares.includes(parseInt(clickedSquare.id))) {
//           clickedSquare.innerHTML = nextSquare.innerHTML;
//           nextSquare.innerHTML = '';

//           const opposingPlayerPiece = (selectedPiece + parseInt(clickedSquare.id)) / 2;
//           let toRemove = document.querySelectorAll(".square");
//           toRemove[opposingPlayerPiece].innerHTML = '';

//           nextSquare = null;
//           //changePlayer();
//         }
//       } else {
//         nextSquare = clickedSquare;
//       }

//       getWinner();
//     };
//   });
// }




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
  currentPlayer = currentPlayer == 'Black' ? 'Red' : 'Black';
   messageEl.innerHTML = `${currentPlayer}'s Turn`
  
}










  


