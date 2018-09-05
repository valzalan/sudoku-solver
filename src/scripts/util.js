module.exports = {

	moveFocus: function( row, col, key ) {
		do {
			switch ( key ) {

			//  Left Arrow
			case 37:

				if ( col == 0 && row == 0 ) {
					row = 8;
					col = 8;
				} else if ( col == 0 && row != 0 ) {
					row--;
					col = 8;
				} else {
					col--;
				}
				break;

			//  Up Arrow
			case 38:
				if ( row == 0 ) {
					row = 8;
				} else {
					row--;
				}
				break;

			//  Tab & Right Arrow
			case 9:
			case 39:
				if ( col == 8 && row == 8 ) {
					row = 0;
					col = 0;
				} else if ( col == 8 && row != 8 ) {
					row++;
					col = 0;
				} else {
					col++;
				}
				break;

			//  Down Arrow
			case 40:
				if ( row == 8 ) {
					row = 0;
				} else {
					row++;
				}
				break;

			default:
				// Shouldn't happen, but...
				console.error( "Unallowed keycode" );
				return undefined;
			}
		} while ( document.getElementById( `r${row}c${col}` ).readOnly );

		return { row: row, col: col };
	},

	assignNumber: function( key, sudoku, cell ) {

		//  Prevent overrides
		if ( isNaN( key ) || sudoku.grid[ cell.row ][ cell.col ] != 0 ) {
			return;
		}

		sudoku.grid[ cell.row ][ cell.col ] = parseInt( key, 10 );
		return;
	},

	lockCell: function( cell ) {

		let elem;
		//	If cell is of form {row: row, col: col}
		if( Object.keys( cell ).length == 2 ) {
			elem = document.getElementById( `r${cell.row}c${cell.col}` );

		//	Cell is from a querySelector
		} else {
			elem = cell;
		}

		elem.readOnly = true;
	  elem.style.backgroundColor = "#D0D6E2"; //TODO: Convert to hsl
	},

	unlockCell: function( cell ) {

		let elem;
		if( Object.keys( cell ).length == 2 ) {
			elem = document.getElementById( `r${cell.row}c${cell.col}` );

		//	Cell is from a querySelector
		} else {
			elem = cell;
		}

		elem.readOnly = false;
	  elem.style.backgroundColor = "hsl(215, 25%, 90%)";
	},

	_modal: {
		set: function( type, text ) {
			let modal = document.getElementById( "modal" );
			modal.className = type;

			let textElem = document.getElementById( "modal-text" );
			if ( type == "win" ) {
				textElem.innerHTML = "Congratulations, you solved the puzzle!";
				textElem.style.color = "green";
			} else if ( type == "error" ) {
				textElem.innerHTML = "There is no solution.";
				textElem.style.color = "red";
			}
		},

		show: function() {
			let modal = document.getElementById( "modal" );

			//	Remove hiding animation
			modal.classList.remove( "animOut" );

			modal.style.display = "block";
		},

		hide: function() {
			let modal = document.getElementById( "modal" );

			//	Add hiding animation
			modal.classList.add( "animOut" );
			modal.addEventListener( "animationend", function hideModal() {
				modal.style.display = "none";
				modal.removeEventListener("animationend", hideModal);
			});
		}
	}
}
