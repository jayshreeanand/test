/*
 * A single cell of a board. Stores the disc information of a cell
 */
var Cell = function(row, column) {
    this.player = null;
    this.row = row;
    this.column = column;
};

Cell.prototype.isEmpty = function() {
    return this.player === null;
};

Cell.prototype.getPlayer = function() {
    return this.player;
};

Cell.prototype.setPlayer = function(player) {
    this.player = player;
};