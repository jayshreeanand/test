var Square = function ( row, column ) {

this.row = row;
this.column = column;


};

Square.prototype.isEmpty = function() {
    return this.piece === null;
};


