// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
	var grid = document.getElementsByClassName('grid-container')[0];

	console.log(grid);
	grid.addEventListener('click', function(e) {
		console.log(e.target.dataset.squareIndex);
	})
}