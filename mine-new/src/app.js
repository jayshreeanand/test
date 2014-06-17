var Game = function(boardElement, userOptions){
this.gameElement = boardElement;

//this.options = $.extend('',default,userOptions);
this.initGame();

};

Game.prototype.start = function(){


};

Game.prototype.restart = function(){

};


Game.prototype.pause = function(){


};

Game.prototype.undo = function(){


};
Game.prototype.initGame = function(){

this.board = new Board(boardElement, this.options);


};


var Board = function(){
this.element = boardElement;
this.rows = 10;
this.cols = 10;
this.mineCount = 10;
this.createBoard();
this.plantMines();
this.solve();

};

function genRandNoArray(){


}
Board.prototype.createBoard = function(){
var html ='';
var type='closed';
this.field = new Array(this.rows);
for( var i =1 ; i<= this.rows ; i++){

	this.field[i]= new Array(this.cols);
html += '<div class="row">';

	for( var j=1; j<= this.cols; j++){

		this.field[i][j] = new Field(i, j,this.rows,this.cols);
		html+= '<span class="' + type + '" data-state ="' + this.field[i][j].state +'" id="'+this.field[i][j].id+'">'+this.field[i][j].symbol+'</span>'

	}
html += '</div>';


}
    this.element.append(html);

};

Board.prototype.plantMines = function(){

var row, col, coord;
var mineLoc = [1,2,10,19,56,99,100];
for(var i =0 ; i< mineLoc.length; i++){
row = '';
col ='';
console.log("mine location" + mineLoc[i]);


coord = this.getRowColFromId(mineLoc[i]);

row = coord.row;
col = coord.col;
console.log("row" + row + "col" + col);
this.field[row][col].mine = true;


}

};

Board.prototype.solve = function(){

for(var i = 1; i <= this.rows; i++){

  for(var j = 1; j<=this.cols; j++){
console.log("min3 value" + this.field[i][j].isMine);

  	if(this.field[i][j].isMine()){
  		console.log("jayashree");
  		this.field[i][j].updateFieldView("mine");
  	}

  }


}

};


var Field = function(row,col,rows,cols){
	this.row = row;
	this.col = col;
	this.mine = false;
	this.status = closed; //closed,open, flag, question
	this.mismatch = false; //mismatch between flag and mine
	this.id = getIdFromRowCol(row,col,rows);
	this.symbol = '';
	this.count = 0;
	
};
Field.prototype.updateFieldView = function(type){

console.log("field updated"+ this.row +"col"+ this.col);

console.log("id gotten" + this.id)
var symbol = getSymbol(type);

var field = document.getElementById(this.id);
field.innerHTML = symbol;
field.className = "open";
};

Field.prototype.isMine = function(){

return this.mine;

}
function getIdFromRowCol(row,col,totalRows){


return (((row-1) * totalRows) + col);
//check here id should be between 1 and totalfields

};

Board.prototype.getRowColFromId = function(id){
var col, row;
console.log("this.cols" + this.cols);
console.log("id is " + id );
if((id % this.cols) == 0){
	col = this.cols;
	console.log("tturewa");
}
else{

col = (id % this.cols);
}
row = ((id-col)/this.rows) +1;
return { row:row , col:col};

}
function getSymbol(type){

switch(type){

	case "mine":
		return '*';
	break;

	case "flag":
		return '~';
	break;

	case "blast":
		return '*';
	break;

	case "question":
		return "?";
	break;

	default:
		return '';



}

};