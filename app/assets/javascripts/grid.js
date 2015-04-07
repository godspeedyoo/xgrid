// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];

	console.log(grid);
	grid.addEventListener('click', function(e) {
		var cellId = e.target.dataset.squareIndex || e.target.parentElement.dataset.squareIndex;
				// debugger;
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// returns data in format of Object {data: {array}, cellId: int}
				var data = JSON.parse(JSON.parse(request.responseText)['data']);
				console.log(data[cellId]);
				// console.log(JSON.parse(data['data']));
				// console.log(data['data']);
				// console.log(data['data'][cellId]);

				cellToUpdate = document.querySelector("[data-square-index='" + cellId + "']");
				if (data[cellId] === 1) {
					cellToUpdate.className = cellToUpdate.className + " x"; 
				} else {
					cellToUpdate.className = 'cell'
				}

				// console.log(cellToUpdate);

			}
		}

		request.open('PUT', 'http://localhost:3000/grids/3', true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send("cellId=" + cellId);
	})
}