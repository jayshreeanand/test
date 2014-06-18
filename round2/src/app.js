var Game = function(boardElement){

this.gameElement = boardElement; 
this.initPlayers();
this.init();
this.enableEventListeners();
this.board.makeMove(1,39);
this.board.validMove(4);



};

Game.prototype.init = function(){

this.drawBoard();


};



Game.prototype.initPlayers = function(){



}
Game.prototype.drawBoard = function(){

this.board = new Board(this.gameElement);


};

Game.prototype.enableEventListeners = function(){


};

var Board = function(gameElement){

this.gameElement = gameElement;
this.blackBox = new Array();
this.whiteBox = new Array();

this.create();

};

Board.prototype.create = function(){


var html = '';
var square_id = 1;
var color = 'dark';
var sym = 'b';
var piece;
	this.field = new Array(8);
for (var i =1 ; i < 9; i++){
	this.field[i] = new Array(8);

	html += '<div class="row">';
	for(var j=1; j < 9; j++){

		color = toggle(color);
		sym = toggle(sym);
		piece = startPosition[square_id];
		this.field[i][j] = new Field(i,j,piece);
		html+= '<span class="' + color + '" data-piececolor ="' + this.field[i][j].color +'" data-piece ="'+this.field[i][j].pieceName +'" id="'+this.field[i][j].id+'">'+this.field[i][j].symbol+'</span>'
		square_id++;

	}

		color = toggle(color);
		sym = toggle(sym);

	html += '</div>';
}

    this.gameElement.append(html);

};


Board.prototype.makeMove = function(sourceId, targetId){
var source = getRowCol(sourceId);
var target = getRowCol(targetId);

var abc = this.field[1][1].color;
var sourceField = this.field[source.row][source.col];
var targetField = this.field[target.row][target.col];

var pieceName = sourceField.pieceName;
sourceField.removePiece();

updateField(sourceField.id, sourceField.symbol);
targetField.setPiece(pieceName);
updateField(targetField.id, targetField.symbol);

}


Board.prototype.validMove = function(id){

var coord = getRowCol(id);

var chosenField = this.field[coord.row][coord.col];
var piece = chosenField.piece;
var color = chosenField.color;
console.log("output"+piece+color+id);

//check players turn here

var validMoveSquares = new Array();
var validMoveSquares = this.validateMoves(piece,color,id);
console.log(validMoveSquares);
};

Board.prototype.validateMoves = function(piece, color, id){
piece = piece.toLowerCase();
coord = getRowCol(id);
row = coord.row;
col = coord.col;
var field = this.field;
var possibleFields = new Array();
var validatedFields = new Array();
var validatedFieldIds = new Array();

console.log("row is "+row + "col is "+ col);
switch(piece){

	case "q":
		possibleFields.push(field[row+1][col], field[row-1][col],field[row][col+1],field[row][col-1],field[row+1][col+1],field[row-1][col-1],field[row+1][col-1],field[row-1][col+1]);
	break;

}

console.log(possibleFields);
	validatedFields = this.isValidField(possibleFields,color);

	for(var x = 0 ; x< validatedFields.length; x++){

		validatedFieldIds.push(getIdFromRowCol(validatedFields.row, validatedFields.col));
		console.log("validatedFieldIds" + validatedFieldIds[i]);
	}


	return validatedFieldIds;






}


function getIdFromRowCol(row,col){

return ((row-1) * 8) + col;
//check here id should be between 1 and 64

}

Board.prototype.isValidField = function(fields,color){


for(var i = 0; i< fields.length; i++){

	//check for player color here
	if(fields[i]){

		if(fields[i].color == color){

			//this means it is a friendly peice 
			fields.remove(i);
		}


	}
	else{

		fields.remove(i);

	}


}

return fields;

};
function updateField(id, pieceSymbol){

var square = document.getElementById(id);
square.innerHTML = pieceSymbol;

//update other data attributes here
}

var Field = function(row, col, pieceName){

this.row = row;
this.col = col;


this.id = ((row-1) * 8) + col;
if(pieceName){
this.pieceName = pieceName;
}
else
{
	this.pieceName = '';
}
this.symbol = getSymbol(this.pieceName);
this.color = getColor(this.pieceName); //or directly use charAt(0)
this.piece = getPiece(this.pieceName);

};

Field.prototype.setPiece =function(pieceName){
if(pieceName){
this.pieceName = pieceName;
}
else
{
	this.pieceName = '';
}
this.symbol = getSymbol(this.pieceName);
this.color = getColor(this.pieceName); //or directly use charAt(0)




};

Field.prototype.removePiece = function(){

this.pieceName = '';
this.symbol ='';
this.color = '';



};


Field.prototype.removePieceFromBoard = function(){

//write code to add piece to white box or black box

this.pieceName = '';
this.symbol ='';
this.color = '';

};

function getPiece(pieceName){

	if(pieceName){
		return pieceName.charAt(1);

	}
	return false;

}
function getColor(pieceName){

	if(pieceName.charAt(0)=='w' ){

		return 'white';
	}
	 	return 'black';

}


function getSymbol(pieceName) {


	switch(pieceName){

		case "wK":
			return '♔';
			break;
		case "wQ":
			return '♕';
			break;
		case "wR":
			return '♖';
			break;
		case "wB":
			return '♗';
			break;
		case "wN":
			return '♘';
			break;
		case "wP":
			return '♙';
			break;
		case "bK":
			return '♚';
			break;
		case "bQ":
			return '♛';
			break;
		case "bR":
			return '♜';
			break;
		case "bB":
			return '♝';
			break;
		case "bN":
			return '♞';
			break;
		case "bP":
			return '♟';
			break;
		case "empty":
			return '';
			break;
		default:
			return '';



	}


}


function getRowCol(id){


	
		if(id % 8 == 0){

		col = 8;
	}	
	else {

		col = id %8 ;

	}
	row = ((id - col )/8)+1;


	return {row: row, col:col};
}

function toggle(color){


	if(color =='w' || color =='b'){

		if(color =='w'){

			return 'b';
		}
		return 'w';
	}

	if(color =='dark' || color == 'light'){

		if(color =='dark'){

			return 'light';
		}

			return 'dark';
	}
}

var startPosition = {

	1 : "wR",
	2 : "wN",
	3 : "wB",
	4 : "wQ",
	5 : "wK",
	6 : "wB",
	7 : "wN",
	8 : "wR",
	9 : "wP",
	10 : "wP",
	11 : "wP",
	12: "wP",
	13: "wP",
	14 : "wP",
	15 : "wP",
	16 : "wP",
	64 : "bR",
	63: "bN",
	62: "bB",
	61: "bQ",
	60: "bK",
	59 : "bB",
	58: "bN",
	57 : "bR",
	56: "bP",
	55 : "bP",
	54 : "bP",
	53: "bP",
	52: "bP",
	51 : "bP",
	50 : "bP",
	49 : "bP",




};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

