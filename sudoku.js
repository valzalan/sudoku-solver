//sudokuSolver();
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
    if(solve()){
      write();
    }else{
      alert("There is no solution");
    }

  function findUnAssigned(){
    let i, j, row, col;
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
          //write();         //debug
          if(solve()){
            return true;
          }
        }
      }
      grid[cell.row][cell.col] = 0;
      //write();            //debug
      return false;         //triggers backtracking
    }else{
      return true;
    }
  }

  function isSafe(num, cell){
    let i, j;

    for(i=0; i<9; i++){
      if(grid[cell.row][i] == num && i != cell.col){
        return false;
      }
    }

    for(i=0; i<9; i++){
      if(grid[i][cell.col] == num && i != cell.row){
        return false;
      }
    }

    if(cell.row < 3){
      boxStartRow = 0;
    }else if(cell.row < 6){
      boxStartRow = 3;
    }else{
      boxStartRow = 6;
    }

    if(cell.col < 3){
      boxStartCol = 0;
    }else if(cell.col < 6){
      boxStartCol = 3;
    }else{
      boxStartCol = 6;
    }

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
    let cell;
    let c, i, j;
    for(i=1; i<=9; i++){
      for(j=1; j<=9; j++){
        cell = `r${i}c${j}`;
        c = document.getElementById(cell);
        c.value = grid[i-1][j-1];
      }
    }
  }
}

function fill(){
  let grid2 = [[0,4,1, 9,0,0, 3,0,0,],
              [0,0,0, 0,0,2 ,0,0,0,],
              [7,0,0, 0,4,6, 0,0,1,],

              [9,2,7, 0,0,0 ,0,0,3,],
              [0,0,0, 0,0,0, 0,0,0,],
              [6,0,0, 0,0,0 ,4,9,8,],

              [1,0,0, 6,8,0, 0,0,4,],
              [0,0,0, 5,0,0 ,0,0,0,],
              [0,0,9, 0,0,1, 7,5,0]];
  let cell;
  let c, i, j;
  for(i=1; i<=9; i++){
    for(j=1; j<=9; j++){
      cell = `r${i}c${j}`;
      c = document.getElementById(cell);
      if(grid2[i-1][j-1] == 0){
        c.value = "";
      }else{
        c.value = grid2[i-1][j-1];
      }
    }
  }
}

function clearGrid(){
  let cell;
  let c, i, j;
  for(i=1; i<=9; i++){
    for(j=1; j<=9; j++){
      cell = `r${i}c${j}`;
      grid[i-1][j-1] = 0;
      c = document.getElementById(cell);
      c.value = "";
    }
  }
}

function loadNumber(cell, field, input){
  console.log(cell);
  console.log(input);
  let key = input.keyCode;
  let id = cell.split("");
  let row = id[1];
  let col = id[3];
  if((grid[row-1][col-1]) != 0) return false;
  console.log(key);
  if(!isNaN(input.key)){
    console.log("Number!");
    let num = parseInt(input.key, 10);
    grid[row-1][col-1] = num;
    console.log(grid[row-1][col-1]);
  }else{
    grid[row-1][col-1] = 0;
    field.value = "";
    console.log("Not a number");
    console.log(grid[row-1][col-1]);
  }
}

function clearNumber(cell, input){
  let key = input.keyCode;
  let id = cell.split("");
  let row = id[1];
  let col = id[3];
  if(key == 8){
    grid[row-1][col-1] = 0;
  }
}
