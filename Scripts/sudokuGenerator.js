
function generateSudoku(){
  clearGrid();
  let num;
  let i, j;
  //fill up the left-upmost box with random numbers
  for(i=0; i<3; i++){
    for(j=0; j<3; j++){
      let cell = new Cell(i, j);
      do{
        num = Math.floor((Math.random() * 9) +1);
      }while(!isSafe(num, cell));
      grid[i][j] = num;
    }
  }
  for(i=0; i<9; i++){
    for(j=0; j<9; j++){
      c = document.getElementById(`r${i}c${j}`);
      c.readOnly = true;
      c.style.backgroundColor = "#D0D6E2";
    }
  }
  randomSolve();
  removeNumbers();
  write();

  function Cell(row, col){
    this.row = row;
    this.col = col;
  }
}

function removeNumbers(){
  let row, col;
  for(i=1; i<=46; i++){
    row = Math.floor((Math.random() * 9));
    col = Math.floor((Math.random() * 9));
    if(grid[row][col] == 0){
      i--;
      continue;
    }
    grid[row][col] = 0;
    c = document.getElementById(`r${row}c${col}`);
    c.readOnly = false;
    c.style.backgroundColor = "";
  }
}

function randomSolve(){
    let cell, num;
    if(cell = findUnAssigned()){ //combined assignment and evaluation:
                                //if there are no empty cells, returns false
      let usedNumbers = [0,0,0,0,0,0,0,0,0];
      do{ // repeat until every num from 1 - 9 have been tried
        do{ // repeat until random num is an untried num
          num = Math.floor((Math.random() * 9) +1);
          if(usedNumbers[num-1] == 0){
            usedNumbers[num-1] = 1;
            break;
          }
        }while(1);
        if(isSafe(num, cell)){
          grid[cell.row][cell.col] = num;
          if(randomSolve()){
            return true;
          }
        }
      }while(!noNumLeft(usedNumbers))
        grid[cell.row][cell.col] = 0;
        return false;         //triggers backtracking
      }else{
        return true;
      }
    function noNumLeft(usedNumbers){
      for(i=0; i<9; i++){
        if(usedNumbers[i] == 0) return false;
      }
      return true;
    }
 }
