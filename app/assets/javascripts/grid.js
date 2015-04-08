window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];
	var gridId = parseInt(document.getElementsByClassName('grid-container')[0].id);

	grid.addEventListener('dragover', function(e) {
		e.preventDefault();
	});

	grid.addEventListener("drop", function(e) {
		e.preventDefault();
		console.log(e.target.dataset.squareState == 0);
		if (e.target.dataset.squareState == 0) {
			cellId = e.target.dataset.squareIndex;
			toggleX(cellId, gridId);
		}
	});

	grid.addEventListener('click', function(e) {
		e.preventDefault();
		var cellId = e.target.dataset.squareIndex
		if (cellId == undefined) { return false };
		cellId = parseInt(cellId);
		toggleX(cellId, gridId);
	});

	function toggleX(cellId, gridId) {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// returns data in format of Object {data: {array}, cellId: int}
				var data = JSON.parse(JSON.parse(request.responseText)['data']);
				var	cellToUpdate = document.querySelector("[data-square-index='" + cellId + "']");

				if (cellToUpdate != null) {
					if (data[cellId] === 1) {
						cellToUpdate.className = cellToUpdate.className + " x"; 
						cellToUpdate.dataset.squareState = 1;
						cellToUpdate.setAttribute('draggable', true);
					} else {
						cellToUpdate.className = 'cell'
						cellToUpdate.dataset.squareState = 0;
						cellToUpdate.setAttribute('draggable', false);
					}
				}
			}
		}

		request.open('PUT', 'http://localhost:3000/grids/' + gridId, true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send("cellId=" + cellId);
	}

}