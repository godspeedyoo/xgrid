// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];

	console.log(grid);
	grid.addEventListener('click', function(e) {
		var cellId = e.target.dataset.squareIndex || e.target.parentElement.dataset.squareIndex;
		console.log(cellId);
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				var data = JSON.parse(request.responseText);
				console.log(data);
			}
		}

		request.open('PUT', 'http://localhost:3000/grids/3', true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send("cellId=" + cellId);
	})
}