const util = require( "./util.js" );

module.exports = class Sudoku {
	constructor() {
		//TODO: Maybe make it "private", and add set()?
		this.grid = [[ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],
			           [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],
			           [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],

	               [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],
		             [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],
			           [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],

			           [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],
			           [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ],
			           [ 0, 0, 0,  0, 0, 0,  0, 0, 0 ]];
	}

	solve() {

		let cell = this.findUnAssigned();

		if ( typeof cell === "object" ) {

			for ( let num = 1; num <= 9; num++ ) {

				if ( this.isSafe( num, cell )) {
					this.grid[ cell.row ][ cell.col ] = num;
					if ( this.solve()) {
						return true;
					}
				}
			}

			this.grid[ cell.row ][ cell.col ] = 0;

			//  Triggers backtracking
			return false;

		} else {
			return true;
		}
	}

	findUnAssigned() {
		for ( let row = 0; row < 9; row++ ) {
			for ( let col = 0; col < 9; col++ ) {

				if ( this.grid[ row ][ col ] == 0 ) {
					return { row: row, col: col };
				}
			}
		}
		return false;
	}

	isSolvable() {
		for ( let row = 0; row < 9; row++ ) {
			for ( let col = 0; col < 9; col++ ) {

				let num = this.grid[ row ][ col ];
				if ( num == 0 ) continue;

        if ( !this.isSafe( num, { row: row, col: col })) {
					return false;
				}
			}
		}
		return true;
	}

	isSafe( num, cell ) {

		//  Scanning row and column
		for ( let i = 0; i < 9; i++ ) {
			if (( this.grid[ cell.row ][ i ] == num && i != cell.col ) ||
           ( this.grid[ i ][ cell.col ] == num && i != cell.row )) {
				return false;
			}
		}

		//  Scanning box
		let boxStartRow = cell.row >= 3 ? ( cell.row >= 6 ? 6 : 3 ) : 0,
		    boxStartCol = cell.col >= 3 ? ( cell.col >= 6 ? 6 : 3 ) : 0;

		for ( let row = boxStartRow; row < boxStartRow + 3; row++ ) {
			for ( let col = boxStartCol; col < boxStartCol + 3; col++ ) {

				if (( this.grid[ row ][ col ] == num ) && ( row != cell.row ) && ( col != cell.col )) {
					return false;
				}
			}
		}
		return true;
	}

	isSolved() {

		//  There are no empty cells & no contradictions
		if ( !this.findUnAssigned() && this.isSolvable()) {
			return true;
		} else {
			return false;
		}
	}

	randomSolve() {
		let cell = this.findUnAssigned();

		if ( typeof cell === "object" ) {

			let usedNumbers = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

			//	Repeat until every number from 1 - 9 have been tried
			do {
				let num;

				//	Repeat until random number is an untried one
				do {

					num = Math.floor(( Math.random() * 9 ) + 1 );

					if ( usedNumbers[ num - 1 ] == 0 ) {
						usedNumbers[ num - 1 ] = 1;
						break;
					}

				} while ( 1 );

				if ( this.isSafe( num, cell )) {
					this.grid[ cell.row ][ cell.col ] = num;
					if ( this.randomSolve() ) {
						return true;
					}
				}

			} while ( usedNumbers.includes( 0 ));

			this.grid[ cell.row ][ cell.col ] = 0;

			// Triggers backtracking
			return false;
		} else {
			return true;
		}
	}

	removeNumbers( count ) {
		for ( let i = 1; i <= count; i++ ) {

			let row = Math.floor(( Math.random() * 9 )),
					col = Math.floor(( Math.random() * 9 ));

			if ( this.grid[ row ][ col ] == 0 ) {
				i--;
				continue;
			}

			this.grid[ row ][ col ] = 0;

			util.unlockCell( {row: row, col: col} );
		}
	}

	clearGrid() {
		for ( let row = 0; row < 9; row++ ) {
			for ( let col = 0; col < 9; col++ ) {

				this.grid[ row ][ col ] = 0;

				let cell = document.getElementById( `r${row}c${col}` );
				cell.value = "";
				util.unlockCell( cell );
			}
		}
	}

	writeGrid() {
		for ( let row = 0; row < 9; row++ ) {
			for ( let col = 0; col < 9; col++ ) {

				if ( this.grid[ row ][ col ] == 0 ) {
					continue;
				}

				let cell = document.getElementById( `r${row}c${col}` );
				cell.value = this.grid[ row ][ col ];
			}
		}
	}

}
