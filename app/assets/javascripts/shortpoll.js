document.addEventListener('DOMContentLoaded', function() {

	var grid = document.getElementsByClassName('grid-container')[0];
	var gridId = parseInt(document.getElementsByClassName('grid-container')[0].id);
	var POLL_URL = 'http://localhost:3000/grids/data/',
      POLL_FREQUENCY = 1000;  // every second

  // AJAX call to obtain array of binary ints representing empty cell or 'x'
  // Each index from response data represents corresponding data-square-index 
	function getSquaresData(gridId) {
		console.log("polling...");
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				var data = JSON.parse(JSON.parse(request.responseText)['data']);
				updateCells(data);
			}
		}

		request.open('GET', POLL_URL + gridId, true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type',
														 'application/x-www-form-urlencoded');
		request.send();
	}

	function updateCells(data) {
		for (var i = 0; i < data.length; i++) {
			var currentCell = document.querySelector("[data-square-index='" 
																								+ i 
																								+ "']");
			var squareStateOfDOM = currentCell.dataset.squareState;

			if (data[i] != squareStateOfDOM) {
				updateCell(currentCell, data[i]);
			} 
		}
	}

	function updateCell(cell, squareState) {
		if (cell != null) {
			if (squareState == 1) {
				markCell(cell, squareState)
			} else if (cell != null){
				unmarkCell(cell, squareState)
			}
		}
	}

	// markCell() and unmarkCell() functions are duplicated in grid.js - modularize if further functions need to be shared
	function markCell(cell, squareState) { 
		cell.className = cell.className + " x"; // apply the css styling for 'marked' cells
		cell.dataset.squareState = 1;	// set the state of the square to be 'marked'
		cell.setAttribute('draggable', true); // allow 'marked' cells to be draggable
	}

	function unmarkCell(cell, squarestate) {
		cell.className = 'cell'
		cell.dataset.squareState = 0;
		cell.setAttribute('draggable', false);
	}

	setInterval( function() { getSquaresData(gridId) }, POLL_FREQUENCY); // poll and update DOM as necessary
});
