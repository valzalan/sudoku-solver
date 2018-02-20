//                   Created by Zalán Valkó
//                   Last edit: 2018.02.19
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
	
	if(solve()){
    	  	write();
    	}else{
      		alert("There is no solution");
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
    for(i=1; i<=9; i++){
      for(j=1; j<=9; j++){
        cell = `r${i}c${j}`;
        c = document.getElementById(cell);
        c.value = grid[i-1][j-1];
      }
    }
  }
}

//placeholder function to fill in a preset -- going to be replaced
//by a generator function in the future
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
  let cell, c;
  for(i=1; i<=9; i++){
    for(j=1; j<=9; j++){
      cell = `r${i}c${j}`;
      c = document.getElementById(cell);
      if(grid2[i-1][j-1] == 0){
        c.value = "";
      }else{
        grid[i-1][j-1] = grid2[i-1][j-1];
        c.value = grid[i-1][j-1];
      }
    }
  }
}

//utility function -- assigns 0 to every cell
function clearGrid(){
  let cell, c;
  for(i=1; i<=9; i++){
    for(j=1; j<=9; j++){
      cell = `r${i}c${j}`;
      grid[i-1][j-1] = 0;
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
  if((grid[row-1][col-1]) != 0) return false;
  if(key == 8 && key == 46){    //user pressed backspace or delete
    grid[row-1][col-1] = 0;
  }
  if(!isNaN(input.key)){
    let num = parseInt(input.key, 10);
    grid[row-1][col-1] = num;
	if(!checkInput(num, row, col)) alert("Contradiction!");
  }else{                          //input was not a number
    grid[row-1][col-1] = 0;      //0 necessary for clarity
    field.value = "";
  }
}

function checkInput(num, row, col){
	//scanning row and column
	for(i=0; i<9; i++){
      	if((grid[row][i] == num && i != col) ||
    	 	(grid[i][col] == num && i != row)){
       	return false;
   		}
 	}
    //scanning box
    boxStartRow = (row >= 3) ? (row >= 6 ? 6 : 3) : 0;
    boxStartCol = (col >= 3) ? (col >= 6 ? 6 : 3) : 0;

    for(i=boxStartRow; i<(boxStartRow + 3); i++){
      for(j=boxStartCol; j<(boxStartCol + 3); j++){
        if((grid[i][j] == num) && (i != row) && (j != col)){
          return false;
        }
      }
    }
    return true;
}
