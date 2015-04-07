window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];

	grid.addEventListener('dragstart', function(e) {
		e.preventDefault();
		debugger;
		console.log(e.target.id);
	});

	grid.addEventListener('click', function(e) {
		e.preventDefault();
		var cellId = e.target.dataset.squareIndex || e.target.parentElement.dataset.squareIndex;
		cellId = parseInt(cellId);
		console.log(cellId);

		var gridId = parseInt(document.getElementsByClassName('grid-container')[0].id);
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// returns data in format of Object {data: {array}, cellId: int}
				console.log(request.responseText);
				var data = JSON.parse(JSON.parse(request.responseText)['data']);

				cellToUpdate = document.querySelector("[data-square-index='" + cellId + "']");
				if (data[cellId] === 1) {
					cellToUpdate.className = cellToUpdate.className + " x"; 
				} else {
					cellToUpdate.className = 'cell'
				}
			}
		}

		request.open('PUT', 'http://localhost:3000/grids/' + gridId, true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send("cellId=" + cellId);
	})
}