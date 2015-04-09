window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];
	var updateURL = 'http://localhost:3000/grids/';

	grid.addEventListener('dragover', function(e) {
		e.preventDefault();
	});

	grid.addEventListener('touchmove', function(e) {
		e.preventDefault();
	});

	grid.addEventListener("drop", function(e) {
		e.preventDefault();
		var	cellIndex = getCellIndex(e);
		if (e.target.dataset.squareState == 0) {
			toggleX(cellIndex); // toggle the dropped cell only if it is unmarked
		}
	});

	grid.addEventListener("touchend", function(e) {
		e.preventDefault();
		var changedTouch = e.changedTouches[0];
		var	sourceCellIndex = getcellIndex(e);
		var sourceCellState = e.target.dataset.squareState;

		var targetCell = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY); 
		var targetCellIndex = targetCell.dataset.squareIndex;
		var targetCellState = targetCell.dataset.squareState;

	 	// toggle the dropped cell only if source is marked and target is unmarked
		if (targetCellState == 0 && sourceCellState == 1) {
			toggleX(targetCellIndex);
		}
	});

	grid.addEventListener('click', function(e) {
		e.preventDefault();
		var	cellIndex = getcellIndex(e);
		if (cellIndex == undefined) { return; } // handle error for clicking on non cell - or remove and add event listener to cells directly
		toggleX(cellIndex);
	});

	function getcellIndex(e) {
		return e.target.dataset.squareIndex;
	};

	function getCellObject(cellIndex) {
		return document.querySelector("[data-square-index='" + cellIndex + "']");
	};

	function toggleX(cellIndex) {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// returns data in format of Object {data: [number]}

				var data = JSON.parse(request.responseText).data;
				var cellToUpdate = getCellObject(cellIndex);

				if (cellToUpdate != null) {
					if (data[cellIndex] === 1) {
						CellModule.markCell(cellToUpdate);
					} else {
						CellModule.unmarkCell(cellToUpdate);
					}
				}
			}
		};

		request.open('PUT', updateURL + grid.id, true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type',
													   'application/x-www-form-urlencoded');
		request.send("cellIndex=" + cellIndex);
	};
}