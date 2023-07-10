/*----- app's state (variables) -----*/
let currentPlayer;
let board;
const squares = document.querySelectorAll('.square');
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



/*----- cached element references -----*/
const boardEl = document.getElementById('gameboard');

/*----- functions -----*/
init();

function init() {
  currentPlayer = 'Black';
  render();
  //alert('black always starts');
}

function render() {
  renderBoard();
  renderMove();
}



function renderBoard() {
 
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
 renderMove();
}


function validMove() {
  squares.forEach(square => {
    square.addEventListener('click', function(evt) {
      const clickedSquare = evt.target;
      //console.log(clickedSquare)
      if (nextSquare) {
        console.log(nextSquare)
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
        if (validSquares.includes(parseInt(clickedSquare.id))) {
          clickedSquare.innerHTML = nextSquare.innerHTML;
          nextSquare.innerHTML = '';
          nextSquare = null;
          //changePlayer();
        } 
      } else {
        nextSquare = clickedSquare;
      }
      getWinner(); 
    });
  });
}

function playerJump(){
  squares.forEach(square => {
    square.addEventListener('click', function(evt) {
      const clickedSquare = evt.target;
      //console.log(clickedSquare)
      if (nextSquare) {
        console.log(nextSquare)
        const selectedPiece = parseInt(nextSquare.id);
        const validSquares = [];

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
    const opposingPlayerPiece = (selectedPiece + parseInt(clickedSquare.id))/2;
    console.log(opposingPlayerPiece)
  let toRemove = document.querySelectorAll(".square")
  toRemove[opposingPlayerPiece].innerHTML='';
    nextSquare = null;
    //changePlayer();
  } 
} else {
  nextSquare = clickedSquare;
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
    alert('Black Wins');
  } else if (!blackRemaining) {
    alert('Red Wins');
  }
}

function changePlayer() {
 
};











  


