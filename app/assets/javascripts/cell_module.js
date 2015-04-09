var CellModule = {

	markCell: function(cell) { 
		cell.className = cell.className + " x"; // apply the css styling for 'marked' cells
		cell.dataset.squareState = 1;	// set the state of the square to be 'marked'
		cell.setAttribute('draggable', true); // allow 'marked' cells to be draggable
	},

	unmarkCell: function(cell) {
		cell.className = 'cell'
		cell.dataset.squareState = 0;
		cell.setAttribute('draggable', false);
	}
};