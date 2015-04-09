window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];
	var gridId = parseInt(document.getElementsByClassName('grid-container')[0].id);
	var updateURL = 'http://localhost:3000/grids/';

	grid.addEventListener('dragover', function(e) {
		e.preventDefault();
	});

	grid.addEventListener("drop", function(e) {
		e.preventDefault();
		getCellId(e);
		if (e.target.dataset.squareState == 0) {
			toggleX(cellId, gridId); // toggle the dropped cell only if it is unmarked
		}
	});

	grid.addEventListener('click', function(e) {
		e.preventDefault();
		getCellId(e);
		if (cellId == undefined) { return false }; // handle error for clicking on non cell - or remove and add event listener to cells directly
		toggleX(cellId, gridId);
	});

	function getCellId(e) {
		return cellId = e.target.dataset.squareIndex 
	};

	function getCellObject(cellId) {
		return cellToUpdate = document.querySelector(
								"[data-square-index='" 
								+ cellId 
								+ "']");
	};

	function markCell(cell) {
		cell.className = cell.className + " x"; 
		cell.dataset.squareState = 1;
		cell.setAttribute('draggable', true);
	};

	function unmarkCell(cell) {
		cell.className = 'cell'
		cell.dataset.squareState = 0;
		cell.setAttribute('draggable', false);
	};

	function toggleX(cellId, gridId) {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// returns data in format of Object {data: {array}, cellId: int}
				var data = JSON.parse(JSON.parse(request.responseText)['data']);
				
				getCellObject(cellId);

				if (cellToUpdate != null) {
					if (data[cellId] === 1) {
						markCell(cellToUpdate);
					} else {
						unmarkCell(cellToUpdate);
					}
				}
			}
		};

		request.open('PUT', updateURL + gridId, true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type',
													   'application/x-www-form-urlencoded');
		request.send("cellId=" + cellId);
	};
}