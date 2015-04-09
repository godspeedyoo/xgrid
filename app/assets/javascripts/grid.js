window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];
	var updateURL = 'http://localhost:3000/grids/';

	grid.addEventListener('dragover', function(e) {
		e.preventDefault();
	});

	grid.addEventListener("drop", function(e) {
		e.preventDefault();
		var	cellId = getCellId(e);
		if (e.target.dataset.squareState == 0) {
			toggleX(cellId); // toggle the dropped cell only if it is unmarked
		}
	});

	grid.addEventListener('click', function(e) {
		e.preventDefault();
		var	cellId = getCellId(e);
		if (cellId == undefined) { return; } // handle error for clicking on non cell - or remove and add event listener to cells directly
		toggleX(cellId);
	});

	function getCellId(e) {
		return e.target.dataset.squareIndex;
	};

	function getCellObject(cellId) {
		return document.querySelector("[data-square-index='" + cellId + "']");
	};

	function toggleX(cellId) {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// returns data in format of Object {data: [number]}

				var data = JSON.parse(request.responseText).data;
				var cellToUpdate = getCellObject(cellId);

				if (cellToUpdate != null) {
					if (data[cellId] === 1) {
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
		request.send("cellId=" + cellId);
	};
}