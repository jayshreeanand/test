/*
 * Board data representation.
 */
var Board = function(width, height, players) {
    this.width = width;
    this.height = height;

    this.player1 = players.green;
    this.player2 = players.red;
    this.currentPlayer = this.player1;

    // cells is a 2-D array representing the cells of the given board.
    this.cells = new Array(height);

    // set all sells to Null
    for(var row = 0; row < height; row++) {
        this.cells[row] = new Array(width);
        for(var column = 0; column < width; column++) {
            this.cells[row][column] = new Cell(row, column);
        }
    }

    // topMostCellOfColumns remembers the top most occupied cell of columns
    this.topMostCellOfColumns = new Array(width);
    for(var column = 0; column < width; column++) {
        this.topMostCellOfColumns[column] = -1;
    }
};

Board.prototype.getWidth = function() {
    return this.width;
};

Board.prototype.getHeight = function() {
    return this.height;
};

Board.prototype.getCell = function(row, col) {
    if(row < 0 || row >= this.getHeight()) {
        return null;
    } else if(col < 0 || col >= this.getWidth()) {
        return null;
    }

    return this.cells[row][col];
}

Board.prototype.getCells = function() {
    return this.cells;
};

Board.prototype.getCurrentPlayer = function() {
    return this.currentPlayer;
}

Board.prototype.toggleCurrentPlayer= function() {
    if(this.currentPlayer == this.player1) {
        this.currentPlayer = this.player2;
    }
    else {
        this.currentPlayer = this.player1;
    }
};

// set cell and update topmostCell index
Board.prototype.insertDisc = function(row, column) {
    this.cells[row][column].setPlayer(this.getCurrentPlayer());
    this.topMostCellOfColumns[column] = row;
};

Board.prototype.getTopMostUnoccupiedCell = function(column) {
    return this.topMostCellOfColumns[column] + 1;
};

Board.prototype.isValidInsertion = function(row, column) {
    if( row < 0 || row >= this.height) {
        return false;
    }
    else if(column < 0 || column >= this.width) {
        return false;
    }

    return true;
};

Board.prototype.isGameOver = function() {
    var connectedCells = this.getConnectedCells();
    return (connectedCells !== null);
};


// Cells are conencted if they exist (outside board edge conditions), they are not empty and they have discs of same color
Board.prototype.areCellsConnected = function(cell1, cell2, cell3, cell4) {
    if(cell1 === null || cell2 === null || cell3 === null || cell4 === null) {
        return false;
    }
    else if(cell1.isEmpty() || cell2.isEmpty() || cell3.isEmpty() || cell4.isEmpty()) {
        return false;
    }
    else if(cell1.getPlayer() == cell2.getPlayer() && cell2.getPlayer() == cell3.getPlayer() && cell3.getPlayer() == cell4.getPlayer()) {
        return true;
    }
    return false;
};



Board.prototype.getConnectedCells = function() {
    // Ideally speaking, game over can only happen with the disc being inserted,
    // is one of the four connected discs.
    // But the board size is very small, so a brute force check of the entire board will work too.

    for(var row = 0; row < this.getHeight(); row++) {
        for(var col = 0; col < this.getWidth(); col++) {

            // horizontal line
            var cell1 = this.getCell(row, col);
            var cell2 = this.getCell(row, col + 1);
            var cell3 = this.getCell(row, col + 2);
            var cell4 = this.getCell(row, col + 3);

            if(this.areCellsConnected(cell1, cell2, cell3, cell4)) {
                return [cell1, cell2, cell3, cell4];
            }

            // vertical line
            var cell1 = this.getCell(row, col);
            var cell2 = this.getCell(row + 1, col);
            var cell3 = this.getCell(row + 2, col);
            var cell4 = this.getCell(row + 3, col);

            if(this.areCellsConnected(cell1, cell2, cell3, cell4)) {
                return [cell1, cell2, cell3, cell4];
            }

            // forward slash diagonal
            var cell1 = this.getCell(row, col);
            var cell2 = this.getCell(row + 1, col + 1);
            var cell3 = this.getCell(row + 2, col + 2);
            var cell4 = this.getCell(row + 3, col + 3);

            if(this.areCellsConnected(cell1, cell2, cell3, cell4)) {
                return [cell1, cell2, cell3, cell4];
            }

            // backward slash diagonal
            var cell1 = this.getCell(row, col);
            var cell2 = this.getCell(row - 1, col + 1);
            var cell3 = this.getCell(row - 2, col + 2);
            var cell4 = this.getCell(row - 3, col + 3);

            if(this.areCellsConnected(cell1, cell2, cell3, cell4)) {
                return [cell1, cell2, cell3, cell4];
            }
        }
    }

    return null;
};
