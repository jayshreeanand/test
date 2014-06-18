var Game = function(boardElement, userOptions){
this.gameElement = boardElement;
this.timerElement  = document.getElementById("timer");
var game = this;
this.movesArray = new Array();
this.options = {

	rows:10,
	cols:10,
	mineCount:10
};
this.startTime = null;
this.timerElement.innerHTML = "00:00";
//this.options = $.extend('',default,userOptions);



    this.onMouseDown = function(e) {
     
      var obj = getMouseObject(e);
      console.log("inside mouse down loop now");
      if ( game.board.fieldIdExists(obj.id) ){

        if(!game.startTime){
            game.startTimer();


        }
       }

    }




    this.initTimer = function() {
      if (game.startTime) {
        var diff = Math.floor( ( new Date().getTime() - game.startTime) / 1000);
        var mins = "0" + String( Math.floor(diff / 60) );
        var secs = "0" + String(diff % 60);
        document.getElementById("timer").innerHTML = 
  		mins.substring(mins.length - 2) + ":" + secs.substring(secs.length - 2);
        setTimeout(game.initTimer, 1000);
      }
    }

    
this.initGame();
 // this.startTimer();
 this.enableClickListenernew();




};



Game.prototype.enableClickListenernew = function() {
	var id, typeofButton;
	var $game = this;

	  this.gameElement.contextmenu(function(e) {
	  	console.log("right click buttoon pressed on id "+ e.target.id + "and button is " +e.which);
	  	id = e.target.id;
	  	typeofButton = 3; //this is a right mouse button
        e.preventDefault();
        $game.board.clickField(id, typeofButton);
        $game.logMoves(id, typeofButton);

    });

	
  this.gameElement.click(function(event) {

  	if(event.which ==1){ //eliminates case for middle mouse button click

  		console.log("inside enable click listener new");
 	 var target_el = event.target;
   console.log("the id of the element being cicked is "+ target_el.id);
       console.log("the mouse button being pressed is "+ event.which);

       id = target_el.id;
       typeofButton = event.which;
        $game.board.clickField(id, typeofButton);
        $game.logMoves(id, typeofButton);


  	}
  
    });

        // this.board.clickField(id, typeofButton);

};



  function getMouseObject(e) {

    /* returns the mouse target element*/
    return(e? e.target: window.event.srcElement);
  }


  Game.prototype.startTimer = function(){
    this.startTime = new Date().getTime();
    this.initTimer();


  };
    
  Game.prototype.enableClickListener = function() {
  	console.log("inside enable clicke listener funciton00");
      this.board.element.onmousedown   = this.onMouseDown;
      console.log("enable clicke listesten line 2");
      this.board.element.oncontextmenu = function(){return false;};
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


var Board = function(boardElement,options){
this.element = boardElement;
this.rows = options.rows;
this.cols = options.cols;
this.mineCount = options.mineCount;
this.flagCount = 0;
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

this.updateRemainingMineCount();
this.enableClickListeners();
};

Board.prototype.updateRemainingMineCount = function(){

var RemMineCount = this.mineCount - this.flagCount;
document.getElementById("remaining-mines").innerHTML = String(RemMineCount);
return;

};

Board.prototype.enableClickListeners = function(){


};

function genRandNoArray(){


};


Game.prototype.logMoves = function(id, typeofButton){
this.movesArray.push([id,typeofButton]);
console.log("the element inserted is with id"+ this.movesArray[this.movesArray.length -1][0] + " and with type of click as "+ this.movesArray[this.movesArray.length -1][1] );

};

Game.prototype.deleteLastMove = function(){

this.movesArray.pop();
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
			if(this.fieldExists(row,col)){ //check if a field with that particular coordinates fieldExists
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

Board.prototype.clickField	= function(id, typeofButton){

if(typeofButton ==1 ){ //left click
this.openField(id);

}
else if(typeofButton ==3 ){
coord = this.getRowColFromId(id);
this.field[coord.row][coord.col].updateFieldView("flag");

}

};
Board.prototype.fieldExists = function(row,col){

			if((row >0 && row <=this.rows ) &&(col>0 && col <= this.cols)){
				return true;
			}
			return false;


};

Board.prototype.fieldIdExists = function(id){
var maxId = this.getIdFromRowCol(this.rows,this.cols);
if(id >0 && id <= maxId){
	return true;
}
return false;

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

