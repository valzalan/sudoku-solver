//TODO: Add hotkey tips on loading page
const createGrid = require( "./createGrid.js" ),
			Sudoku = require( "./Sudoku.js" ),
			util = require( "./util.js" );

( function() {

	createGrid();

	let sudoku = new Sudoku();

//----------------------
//    Event handlers
//----------------------

	let cellElements = document.getElementsByTagName( "input" );

	for ( let elem of cellElements ) {
		elem.addEventListener( "keydown", function( event ) {

			let cell = {
						row: Number( event.target.id.charAt( 1 )),
						col: Number( event.target.id.charAt( 3 ))
					};

			//  Numbers 1 - 9(+numPad), arrows, tab, delete, backspace
			let allowedKeys = [ 8, 9, 37, 38, 39, 40, 46, 49, 50, 51, 52, 53, 54, 55,
                         56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105 ];

			if ( !allowedKeys.includes( event.keyCode )) {
				event.preventDefault();
				return;
			}

			//  Arrow keys and tab
			if ([ 37, 38, 39, 40, 9 ].includes( event.keyCode )) {
				event.preventDefault();
				let nextCell = util.moveFocus( cell.row, cell.col, event.keyCode );

				document.getElementById( `r${nextCell.row}c${nextCell.col}` ).focus();
			}

			//  Numbers 1-9 & Numpad 1-9
			if (( event.keyCode >= 49 && event.keyCode <= 57 ) ||
          ( event.keyCode >= 97 && event.keyCode <= 105 )) {
				util.assignNumber( event.key, sudoku, cell );
				if ( sudoku.isSolved()) {
					util._modal.set( "win" );
					util._modal.show();
				}
			}

			//  Backspace & Del
			if ( event.keyCode == 8 || event.keyCode == 46 ) {
				event.preventDefault();
				sudoku.grid[ cell.row ][ cell.col ] = 0;
				event.srcElement.value = "";
			}
		});
	}

  window.addEventListener( "keydown", function(){
    //  Enter
    if( event.keyCode == 13 ) {
      initSolve();
    }

    //  Space
    if( event.keyCode == 32 ) {
      sudoku.clearGrid();
    }
  });

	let solveButton = document.getElementById( "btn-solve" );
	solveButton.addEventListener( "click", function() {
    initSolve();
  });

	let clearButton = document.getElementById( "btn-clear" );
	clearButton.addEventListener( "click", function() {
		sudoku.clearGrid();
	});

	let makeButton = document.getElementById( "btn-make" );
	makeButton.addEventListener( "click", function() {
		//	Generates a puzzle

		sudoku.clearGrid();
	  sudoku.randomSolve();

		//	Using regex would make it more bloated. Selects all input, whose id begins with "r"
		let cells = document.querySelectorAll( "input[id^=\"r\"]" );

		cells.forEach( function( cell ) {
			util.lockCell( cell );
		});

		sudoku.removeNumbers(46);
		sudoku.writeGrid();
	});

	let modalClose = document.getElementById( "close" );
	modalClose.addEventListener( "click", function(){
		util._modal.hide();
	});

//=========================

  function initSolve() {

    if ( sudoku.isSolvable()) {
  		if ( sudoku.solve()) {
  			sudoku.writeGrid();
  		} else {
				util._modal.set( "error" );
				util._modal.show();
  		}
  	} else {
			util._modal.set( "error" );
			util._modal.show();
  	}
  }
})();
