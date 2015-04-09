document.addEventListener('DOMContentLoaded', function() {

	var grid = document.getElementsByClassName('grid-container')[0];
	var POLL_URL = 'http://localhost:3000/grids/data/',
      POLL_FREQUENCY = 1000;  // every second

  // AJAX call to obtain array of binary ints representing empty cell or 'x'
  // Each index from response data represents corresponding data-square-index 
	function getSquaresData(grid) {
		console.log("polling...");
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				var cellStateData = JSON.parse(request.response).data;
				debugger;
				updateCells(cellStateData);
			}
		}

		request.open('GET', POLL_URL + grid.id, true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type',
														 'application/x-www-form-urlencoded');
		request.send();
	}

	function updateCells(cellStateData) {
		for (var i = 0; i < cellStateData.length; i++) {
			var currentCell = document.querySelector("[data-square-index='" 
																								+ i 
																								+ "']");
			var squareStateOfDOM = currentCell.dataset.squareState;

			if (cellStateData[i] != squareStateOfDOM) {
				updateCell(currentCell, cellStateData[i]);
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


	// Why are you sending in squareState here? They're not used. 
	// Also, I'd make these functions shared somehow. 
	// In larger projects you'd encounter problems if they ever
	// get out of sync. Make them global?

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

	setInterval( function() { getSquaresData(grid) }, POLL_FREQUENCY); // poll and update DOM as necessary
});
