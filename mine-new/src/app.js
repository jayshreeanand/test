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
this.calculateFieldCount();	
// this.solve();
this.openField(2);
this.openField(10);

this.openField(19);

this.openField(77);

this.openField(100);

this.openField(50);


};

function genRandNoArray(){


};

Board.prototype.openField = function(id){
var coord = this.getRowColFromId(id);
var row = coord.row;
var col = coord.col;

if(this.field[row][col].isMine()){
	//game over
	this.field[row][col].updateFieldView("blast");
	//trigger other gameover events here

}else{

	this.field[row][col].updateFieldView(this.field[row][col].mineCount);
}

};

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
var mineLoc = [2,10,19,56,99,100];
for(var i =0 ; i< mineLoc.length; i++){
row = '';
col ='';


coord = this.getRowColFromId(mineLoc[i]);

row = coord.row;
col = coord.col;
this.field[row][col].mine = true;


};




};

Board.prototype.calculateFieldCount = function(){

	//this is the list of 8 neighbouring cells
	var neighbours = [[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];

	var row, col,tot;

for(var i =1; i <= this.rows; i++){

	for(var j=1; j <= this.cols; j++){
		if(this.field[i][j].isMine()){
			this.field[i][j].mineCount = -1;
		}
		else{
			console.log("row col is"+ i + ":" + j);
			tot = 0;


		for(var z = 0; z < neighbours.length ; z++){
			
			row = i + neighbours[z][0];
			col = j + neighbours[z][1];
			if((row >0 && row <=this.rows ) &&(col>0 && col <= this.cols)){
			console.log("neighbour cell "+ z + " is" + "row col "+ row +":"+ col);

				if(this.field[row][col].isMine()){
					console.log("one mine neightbour");
					tot +=1;
				}
			}

			this.field[i][j].mineCount = tot;
			console.log("tot value is "+ tot);

		}
		}	


	}
}

};

Board.prototype.solve = function(){

for(var i = 1; i <= this.rows; i++){

  for(var j = 1; j<=this.cols; j++){

  	if(this.field[i][j].isMine()){
  		this.field[i][j].updateFieldView("blast");
  	}
  	else{
		this.field[i][j].updateFieldView(this.field[i][j].mineCount);

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

var symbol = getSymbol(type);

var field = document.getElementById(this.id);
field.innerHTML = symbol;
field.className = type;
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
if((id % this.cols) == 0){
	col = this.cols;
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
		return '✹';
	break;

	case "flag":
		return '⚑';
	break;

	case "blast":
		return '✹';
	break;

	case "question":
		return "?";
	break;
	case "cross":
		return "✕";
	break;
	default:
		return type;



}

};

function countTimer()
{
   matchingGame.elapsedTime++;
   
   // calculate the minutes and seconds from elapsed time
   var minute = Math.floor(matchingGame.elapsedTime / 60);
   var second = matchingGame.elapsedTime % 60;   
   
   // add padding 0 if minute and second is less then 10
   if (minute < 10) minute = "0" + minute;
   if (second < 10) second = "0" + second;
   
   // display the elapsed time
   $("#elapsed-time").html(minute+":"+second);
}

