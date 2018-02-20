 //draws the grid and assigns unique id to input fields
function createTable(){    

	let tableString = "<table>";
    let div = document.createElement("div");
    let cellR = 1, cellC = 1;
    let cellId;
    for(i=1; i<12; i++){
      if(i == 4 || i == 8){
        tableString += '<tr class = "divider">';
        continue;
      }
        tableString += "<tr>";
      for(j=1; j<12; j++){
        if((j % 4) == 0){
          tableString += '<td class = "divider"></td>';
        }else{
          tableString += '<td><input type = "text" id = "'+ `r${cellR}c${cellC}`
          + '" maxlength = "1" onkeyup = "loadNumber(this.id, event)" onkeydown = "loadNumber(this.id, event, this)"></td>';
          cellC++;
        }
      }
      tableString += "</tr>";
      cellC = 1;
      cellR++;
    }
    tableString += "</table>";
    div.innerHTML = tableString;
    document.body.appendChild(div);
}