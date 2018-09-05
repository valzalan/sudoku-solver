
module.exports = function() {

	let tableString = "<table>",
			container = document.createElement( "div" );

	for ( let row = 0; row < 9; row++ ) {

		if ( row == 3 || row == 6 ) {
			tableString += "<tr class='divider'></tr>";
		}

		tableString += "<tr>";

		for ( let col = 0; col < 9; col++ ) {

			if ( col == 3 || col == 6 ) {
				tableString += "<td class='divider'></td>";
			}
			tableString += "<td><input type = \"text\" id = \"" + `r${row}c${col}` + "\" maxlength = \"1\"></td>";
		}

		tableString += "</tr>";
	}

	tableString += "</table>";

	container.className = "grid-container";
	container.innerHTML = tableString;
	document.getElementById( "title" ).insertAdjacentElement( "afterend", container );
}
