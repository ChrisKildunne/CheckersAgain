/*----- app's state (variables) -----*/
const COLORS = {
    '1': 'red',
    '-1': 'black',
    'null': 'white'
  };
  
  let game;
  let winner;
  let board;
  
  let turn;
  
  /*----- cached element references -----*/
  const boardEl = document.getElementById('board');
  document.getElementById('message');
  // document.querySelector('button').addEventListener('click',init)
  
  
  
  let pieces =Array.from(document.querySelectorAll('.brown'));
  /*----- classes -----*/
  
  
  /*----- functions -----*/
  init()
  function init(){
    board= [
    [0,-1,0,-1,0,-1,0,-1]
    [-1,0,-1,0,-1,0,-1,0]
    [0,-1,0,-1,0,-1,0,-1]
    [0,0,0,0,0,0,0,0]
    [0,0,0,0,0,0,0,0]
    [0,1,0,-1,0,-1,0,-1]
    [-1,0,-1,0,-1,0,-1,0]
    [0,-1,0,-1,0,-1,0,-1]
    ];
    turn=1;
    winner=null;
    
   
  
    // const idx = parseInt(evt.target.className.replace('brown', '').trim());
    // let boxEl = document.getElementById(`brown-${idx}`);
    // boxEl.style.backgroundColor = COLORS[boxEl];
    
  }
  
  renderBoard(){
    
  }