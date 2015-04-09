window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];
	var updateURL = 'http://xgrid.herokuapp.com/grids/';
	var touchMove = false; // store state of touchmove action for mobile

	grid.addEventListener('dragover', function(e) {
		e.preventDefault();
	});

	grid.addEventListener("drop", function(e) {
		e.preventDefault();
		var	cellIndex = getCellIndex(e.target);
		if (e.target.dataset.squareState == 0) {
			toggleX(cellIndex); // toggle the dropped cell only if it is unmarked
		}
	});

	grid.addEventListener('click', function(e) {
		e.preventDefault();
		var	cellIndex = getCellIndex(e.target);
		if (cellIndex == undefined) { return; } // handle error for clicking on non cell - or remove and add event listener to cells directly
		toggleX(cellIndex);
	});

	// mobile
	grid.addEventListener('touchmove', function(e) {
		e.preventDefault();
		touchMove = true;
		console.log(touchMove);
	});

	// handles both click and drag events for mobile
	grid.addEventListener("touchend", function(e) {
		e.preventDefault();
		var	sourceCellIndex = getCellIndex(e.target);
		var sourceCellState = getCellState(e.target);

		var changedTouch = e.changedTouches[0];
		var targetCell = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY); 
		var targetCellIndex = getCellIndex(targetCell);
		var targetCellState = getCellState(targetCell);

		// emulate what would happen on a complete click action by toggling cell
		if (sourceCellIndex == targetCellIndex && touchMove == false) {
			if (sourceCellIndex == undefined) { return; } // handle error for click on non cell
			toggleX(sourceCellIndex);
			return;
		}
	 	// toggle the dropped cell only if source is marked and target is unmarked
		if (targetCellState == 0 && sourceCellState == 1) {
			toggleX(targetCellIndex);
		}
		touchMove = false; // reset moving state
	});

	function getCellState(element) {
		return element.dataset.squareState;
	}

	function getCellIndex(element) {
		return element.dataset.squareIndex;
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
		request.setRequestHeader('Content-Type',
													   'application/json');
		request.send(JSON.stringify({cellIndex: cellIndex}))
	};
}