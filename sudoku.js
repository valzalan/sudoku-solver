//                   Created by Zalán Valkó
//                   Last edit: 2018.02.21
//  Solves the sudoku using a recursive backtracking algorithm

let grid = [[0,0,0, 0,0,0, 0,0,0,],
            [0,0,0, 0,0,0 ,0,0,0,],
            [0,0,0, 0,0,0, 0,0,0,],

            [0,0,0, 0,0,0 ,0,0,0,],
            [0,0,0, 0,0,0, 0,0,0,],
            [0,0,0, 0,0,0 ,0,0,0,],

            [0,0,0, 0,0,0, 0,0,0,],
            [0,0,0, 0,0,0 ,0,0,0,],
            [0,0,0, 0,0,0, 0,0,0]];

function sudokuSolver(){
  if(isSolvable()){
    if(solve()){
      write();
    }else{
      alert("There is no solution");
    }
  }else{
    alert("There is no solution");
  }
}

  function findUnAssigned(){
    for(i=0; i<9; i++){
      for(j=0; j<9; j++){
        if(grid[i][j] == 0){
          let cell = new Cell(i, j);
          return cell;
        }
      }
    }
    return false; //no empty Cells found, we're finished

    function Cell(row, col){
      this.row = row;
      this.col = col;
    }
  }

  function solve(){
    let cell
    if(cell = findUnAssigned()){ //combined assignment and evaluation:
                                //if there are no empty cells, returns false
      let num;
      for(num=1; num<=9; num++){
        if(isSafe(num, cell)){
          grid[cell.row][cell.col] = num;
          if(solve()){
            return true;
          }
        }
      }
      grid[cell.row][cell.col] = 0;
      return false;         //triggers backtracking
    }else{
      return true;
    }
  }

  function isSafe(num, cell){
    //scanning row and column
    for(i=0; i<9; i++){
      if((grid[cell.row][i] == num && i != cell.col) ||
         (grid[i][cell.col] == num && i != cell.row)){
        return false;
      }
    }
    //scanning box
    boxStartRow = (cell.row >= 3) ? (cell.row >= 6 ? 6 : 3) : 0;
    boxStartCol = (cell.col >= 3) ? (cell.col >= 6 ? 6 : 3) : 0;

    for(i=boxStartRow; i<(boxStartRow + 3); i++){
      for(j=boxStartCol; j<(boxStartCol + 3); j++){
        if((grid[i][j] == num) && (i != cell.row) && (j != cell.col)){
          return false;
        }
      }
    }
    return true;
  }

  // utility function to print the numbers
  function write(){
    let cell, c;
    for(i=0; i<9; i++){
      for(j=0; j<9; j++){
        cell = `r${i}c${j}`;
        c = document.getElementById(cell);
        c.value = grid[i][j];
      }
    }
  }

//placeholder function to fill in a preset -- going to be replaced
//by a generator function in the future
function generateSudoku(){
  let grid2 = [[0,4,1, 9,0,0, 3,0,0,],
              [0,0,0, 0,0,2 ,0,0,0,],
              [7,0,0, 0,4,6, 0,0,1,],

              [9,2,7, 0,0,0 ,0,0,3,],
              [0,0,0, 0,0,0, 0,0,0,],
              [6,0,0, 0,0,0 ,4,9,8,],

              [1,0,0, 6,8,0, 0,0,4,],
              [0,0,0, 5,0,0 ,0,0,0,],
              [0,0,9, 0,0,1, 7,5,0]];
  let cell, c;
  for(i=0; i<9; i++){
    for(j=0; j<9; j++){
      cell = `r${i}c${j}`;
      c = document.getElementById(cell);
      if(grid2[i][j] == 0){
        c.value = "";
      }else{
        grid[i][j] = grid2[i][j];
        c.value = grid[i][j];
      }
    }
  }
}

//utility function -- assigns 0 to every cell
function clearGrid(){
  let cell, c;
  for(i=0; i<9; i++){
    for(j=0; j<9; j++){
      cell = `r${i}c${j}`;
      grid[i][j] = 0;
      c = document.getElementById(cell);
      c.value = "";
    }
  }
}

//utility function to assign input to grid and delete if del or bckspc pressed
function loadNumber(cell, input, field){
  let key = input.keyCode;
  let temp = cell.split("");
  let row = temp[1];
  let col = temp[3];
  if(key == 8 || key == 46){    //user pressed backspace or delete
    grid[row][col] = 0;
    return;
  }
  if((grid[row][col]) != 0) return;
  if(!isNaN(input.key)){
    let num = parseInt(input.key, 10);
    grid[row][col] = num;
    if(checkIfSolved()){
      alert("Congratulations! You solved it!");
    }
    return;
  }else{                          //input was not a number
    grid[row][col] = 0;      //0 necessary for clarity
    field.value = "";
    console.log("Not a number. In cell: " + grid[row][col]);
  }
}

function isSolvable(){
  let row = 0; col = 0;
  let i, j;
  let num, boxStartRow, boxStartCol;
  for(row = 0; row<9; row++){
    for(i=0; i<9; i++){
      num = grid[row][i];
      if(num == 0) continue;
      for(j=0; j<9; j++){
        if(grid[row][j] == num && j != i){
          return false;
        }
      }
    }
  }

  for(col = 0; col<9; col++){
    for(i=0; i<9; i++){
      num = grid[i][col];
      if(num == 0) continue;
      for(j=0; j<9; j++){
        if(grid[j][col] == num && j != i){
          return false;
        }
      }
    }
  }
  for(row=0; row<9; row++){
    for(col=0; col<9; col++){
      num = grid[row][col];
      if(num == 0) continue;
      boxStartRow = (row >= 3) ? (row >= 6 ? 6 : 3) : 0;
      boxStartCol = (col >= 3) ? (col >= 6 ? 6 : 3) : 0;
      for(i=boxStartRow; i<(boxStartRow + 3); i++){
        for(j=boxStartCol; j<(boxStartCol + 3); j++){
          if((grid[i][j] == num) && (i != row) && (j != col)){
            return false;
          }
        }
      }
    }
  }
  return true;
}

function checkIfSolved(){
  let num;
  for(row=0; row<9; row++){
    for(col=0; col<9; col++){
      if(grid[row][col] == 0) return false;
      num = grid[row][col];
      let cell = new Cell(row, col);
      if(!isSafe(num, cell)) return false;
    }
  }
  return true;

  function Cell(row, col){
    this.row = row;
    this.col = col;
  }
}
