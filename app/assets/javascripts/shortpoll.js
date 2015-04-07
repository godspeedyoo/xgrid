(function() {
	function getSquaresData(gridId) {
	console.log("Retrieving squares data...");
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log(request.responseText);
		}
	}

	request.open('GET', 'http://localhost:3000/grids/data/' + gridId, true);
	request.withCredentials = true;
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	request.send();
}



    var POLL_URL = 'localhost:3000/grids/',
        POLL_FREQUENCY = 2000;  // every second

	setInterval(function() {getSquaresData(3)}, 1000); 

}());

window.onLoad = function() {
	var gridId = parseInt(document.getElementsByClassName('grid-container')[0].id);



}

	// 	request.onreadystatechange = function() {
	// 		if (request.readyState == 4 && request.status == 200) {
	// 			// returns data in format of Object {data: {array}, cellId: int}
	// 			console.log(request.responseText);
	// 			var data = JSON.parse(JSON.parse(request.responseText)['data']);

	// 			cellToUpdate = document.querySelector("[data-square-index='" + cellId + "']");
	// 			if (cellToUpdate != null) {
	// 				if (data[cellId] === 1) {
	// 					cellToUpdate.className = cellToUpdate.className + " x"; 
	// 					cellToUpdate.dataset.squareState = 1;
	// 					cellToUpdate.setAttribute('draggable', true);
	// 				} else {
	// 					cellToUpdate.className = 'cell'
	// 					cellToUpdate.dataset.squareState = 0;
	// 					cellToUpdate.setAttribute('draggable', false);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	request.open('PUT', 'http://localhost:3000/grids/' + gridId, true);
	// 	request.withCredentials = true;
	// 	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	// 	request.send("cellId=" + cellId);
	// }
    


