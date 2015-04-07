(function(document) {
	var current_url = window.location.href.split('/');
	var gridId = parseInt(current_url[current_url.length - 1]);

  var POLL_URL = 'localhost:3000/grids/data/',
      POLL_FREQUENCY = 2000;  // every second

	function getSquaresData(gridId) {
		console.log("Retrieving squares data...");
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				console.log(request.responseText);
			}
		}

		request.open('GET', POLL_URL + gridId, true);
		request.withCredentials = true;
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send();
	}

	setInterval(function() {getSquaresData(gridId)}, POLL_FREQUENCY); 



}(document));