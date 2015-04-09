document.addEventListener('DOMContentLoaded', function() {
	console.log('Document ready');

	function getSquaresData(gridId) {
		console.log("polling...");
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				var data = JSON.parse(JSON.parse(request.responseText)['data']);
				updateCells(data);
			}
		}

		if (gridId != NaN) {
			request.open('GET', POLL_URL + gridId, true);
			request.withCredentials = true;
			request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			request.send();
		}
	}

	// grabbing grid ID from URL to avoid waiting on DOM load
	var current_url = window.location.href.split('/');
	var gridId = parseInt(current_url[current_url.length - 1]);

  var POLL_URL = 'http://localhost:3000/grids/data/',
      POLL_FREQUENCY = 2000;  // every second


	setInterval( function() { getSquaresData(gridId) }, POLL_FREQUENCY); 
		

	function updateCells(data) {
		// console.log(data);
		for (var i = 0; i < data.length; i++) {
			var currentCell = document.querySelector("[data-square-index='" + i + "']");
			var squareStateOfDOM = currentCell.dataset.squareState;

			if (data[i] != squareStateOfDOM) {
				// console.log("attempting change");
				updateCell(currentCell, data[i]);
			} 
		}
	}

	function updateCell(cell, squareState) {
		console.log(cell);
		console.log(squareState);

		if (cell != null) {
			if (squareState == 1) {
				cell.className = cell.className + " x"; 
				cell.dataset.squareState = 1;
				cell.setAttribute('draggable', true);
			} else if (cell != null){
				cell.className = 'cell'
				cell.dataset.squareState = 0;
				cell.setAttribute('draggable', false);
			}
		}
	}



});
