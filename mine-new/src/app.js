var Game = function(boardElement, userOptions){
this.gameElement = boardElement;

//this.options = $.extend('',default,userOptions);
this.initGame();

};

Game.prototype.start = function(){


};

Game.prototype.restart = function(){

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

		this.field[i][j] = new Field(i, j);
		html+= '<span class="' + type + '" data-state ="' + this.field[i][j].state +'" id="'+this.field[i][j].id+'">'+this.field[i][j].symbol+'</span>'

	}
html += '</div>';


}
    this.element.append(html);

};
var Field = function(row,col,rows,cols){
	this.row = row;
	this.col = col;
	this.mine = false;
	this.status = closed; //closed,open, flag, question
	this.mismatch = false; //mismatch between flag and mine
	this.id = getIdFromRowCol(row,col,rows);
	this.symbol = '';

	
};

function getIdFromRowCol(row,col,totalRows){


return (((row-1) * totalRows) + col);
//check here id should be between 1 and totalfields

};