document.addEventListener('DOMContentLoaded', function() {

	var grid = document.getElementsByClassName('grid-container')[0];
	var POLL_URL = 'https://xgrid.herokuapp.com/grids/data/',
      POLL_FREQUENCY = 1000;  // every second

  // AJAX call to obtain array of binary ints representing empty cell or 'x'
  // Each index from response data represents corresponding data-square-index 
	function getSquaresData(grid) {
		console.log("polling...");
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				var cellStateData = JSON.parse(request.response).data;
				updateCells(cellStateData);
			}
		}

		request.open('GET', POLL_URL + grid.id, true);
		request.setRequestHeader('Content-Type',
														 'application/json');
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
				CellModule.markCell(cell, squareState)
			} else if (cell != null){
				CellModule.unmarkCell(cell, squareState)
			}
		}
	}


	setInterval( function() { getSquaresData(grid) }, POLL_FREQUENCY); // poll and update DOM as necessary
});
