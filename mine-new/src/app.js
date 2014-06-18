
var Game = function(boardElement, userOptions){
this.gameElement = boardElement;
this.timerElement  = document.getElementById("timer");
var game = this;



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


};

Game.prototype.checkWinGame = function(){
	if(this.board.matchFlagsMines){
		this.winGame();

	}



};


  Game.prototype.winGame = function() {
  //win game message here
  window.setTimeout(function() { window.alert ('You Win!');}, 100);
  this.board.showFlags();
  this.endGame();


  }
Game.prototype.enableClickListener = function() {
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


        if(!$game.startTime){
            $game.startTimer();


        }


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




  Game.prototype.startTimer = function(){
    this.startTime = new Date().getTime();
    this.initTimer();


  };
    


Game.prototype.start = function(){
this.options = this.getUserOptions();
this.startTime = null;
this.timerElement.innerHTML = "00:00";
this.movesArray = new Array();

this.initGame();
 // this.startTimer();
 this.enableClickListener();



};

Game.prototype.restart = function(){
	console.log("inside restart");
this.gameElement.empty();
this.start();
};

  Game.prototype.disableClickListener = function() {
 	
  this.gameElement.contextmenu(function(e) {
	  	return false;
 });
    };


  Game.prototype.stopTimer = function(){

  this.startTime = null;

  }

    Game.prototype.updateRemainingMinesCount = function() {

    document.getElementById("remaining-mines").innerHTML = String(this.board.mineCount - this.board.flags);
  }


Game.prototype.getUserOptions = function(){
var difficulty = document.getElementById("difficulty-level").value;
console.log("difficulty level is " + difficulty);

switch(difficulty){

	case "easy":
	return [10,10,10]
	break;

	case "medium":
	return [15,15,50]

	break;

	case "hard":
	return [18,25,75];

	break;

	default:
	return  [10,10,10];

	break;

}

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
this.rows = options[0];
this.cols = options[1];
this.mineCount = options[2];
this.flagCount = 0;
this.createBoard();
this.plantMines();
this.calculateFieldCount();	
//this.solve();

this.updateRemainingMineCount();
};

Board.prototype.updateRemainingMineCount = function(){

var RemMineCount = this.mineCount - this.flagCount;
document.getElementById("remaining-mines").innerHTML = String(RemMineCount);
return;

};

Board.prototype.showFlags = function(){
	for(var i = 1; i<= this.rows; i++){

		for(var j=1; j<=this.cols; j++){

			if(this.field[i][j].isMine && (!this.field[i][j].isFlag)){

				//reveal the flag here (set field to flag)
			}
		}
	}


};








    Board.prototype.matchFlagsMines = function() {

    	for(var i =1; i<= this.rows; i++){

    		for(var j=1; j<=this.cols; j++){

    			if(this.field[i][j].isFlag() && !(this.flag[i][j].isMine())){ //marked as flag but not a mine

    				return false;

    			}

    		}
    	}
    	return true;


    }

Game.prototype.logMoves = function(id, typeofButton){
this.movesArray.push([id,typeofButton]);
console.log("the element inserted is with id"+ this.movesArray[this.movesArray.length -1][0] + " and with type of click as "+ this.movesArray[this.movesArray.length -1][1] );

};

Game.prototype.deleteLastMove = function(){

this.movesArray.pop();
};
Board.prototype.openField = function(row,col){


if(this.field[row][col].isMine()){
	//game over
	this.field[row][col].updateFieldView("blast");
	//trigger other gameover events here

}else{



	if(this.field[row][col].mineCount == 0)
{
	//this.openConnectedEmptyFields(row,col);
	this.field[row][col].updateFieldView(this.field[row][col].mineCount);


} else{
	this.field[row][col].updateFieldView(this.field[row][col].mineCount);


}


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
var mineLoc = this.generateRandomNoArray();
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


Board.prototype.gameOverSolve = function(){



};

Board.prototype.clickField	= function(id, typeofButton){
	coord = this.getRowColFromId(id);

if(typeofButton ==1 ){ //left click
this.openField(coord.row, coord.col);

}
else if(typeofButton ==3 ){
coord = this.getRowColFromId(id);
//this.field[coord.row][coord.col].updateFieldView("flag");
this.changeState(coord.row,coord.col);
}

};

Board.prototype.openConnectedEmptyFields = function(currRow,currCol){

	this.field[currRow][currCol].updateFieldView(this.field[currRow][currCol].mineCount);

	var neighbours = [[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];
	for(var z = 0; z < neighbours.length ; z++){
			console.log("inside neightbour loop" + z);
			row = currRow + neighbours[z][0];
			col = currCol + neighbours[z][1];
			if(this.fieldExists(row,col)){ //check if a field with that particular coordinates fieldExists

				
					this.openField(row,col);
				
			}

			

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
	this.status = "closed"; //closed,open, flag, question
	this.mismatch = false; //mismatch between flag and mine
	this.id = getIdFromRowCol(row,col,rows);
	this.symbol = '';
	this.count = 0;
	
};

Board.prototype.changeState = function(row,col){
var change =  this.field[row][col].getNextState();
console.log("change vluae is" + change);

if( (change =="flag") && (this.flagCount == this.mineCount)  ){
	return; // Don't allow more number of flags than the minecount
}
else if(change =="flag"){

	this.flagCount++;
}
else if(change == "question"){
	this.flagCount--;
}
this.field[row][col].status = change;
this.field[row][col].updateFieldView(change);

};

Field.prototype.getNextState = function(){
switch(this.status){

	case "closed":
		return "flag";
	case "flag":
		return "question";
	case "question":
		return "closed";

}

};







Field.prototype.isFlag = function(){

	return(this.status =="flag");
}
Field.prototype.updateFieldView = function(type){

var symbol = getSymbol(type);

var field = document.getElementById(this.id);
field.innerHTML = symbol;
field.className = type;
};

Field.prototype.isMine = function(){

return this.mine;

}

Field.prototype.hasZeroMineCount = function(){

	return(this.mineCount == 0);
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
	case "closed":
		return '';
	break;
	case "open":
		return '';
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

// RETURNS PSEUDO-RANDOM NUMBER IN RANGE min...max
function randomNumber(min,max) {

    return (Math.round((max-min) * Math.random() + min));
}


Board.prototype.generateRandomNoArray = function(){

var arr = [];
var max = this.rows * this.cols;
var min = 1;
while(arr.length < this.mineCount){
  var randomnumber=Math.round((max-min) * Math.random() + min)
  var found=false;
  for(var i=0;i<arr.length;i++){
    if(arr[i]==randomnumber){found=true;break}
  }
  if(!found)arr[arr.length]=randomnumber;
}
return arr;
}