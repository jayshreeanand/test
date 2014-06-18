var Board = function(options){
  this.element = $("#game-board");
  this.rows = options[0];// first element of the options array
  this.cols = options[1];// second element of the options array
  this.mineCount = options[2]; //3rd element
  this.flagCount = 0;
  this.createBoard();
  this.plantMines();
  this.calculateFieldCount(); 
  this.emptyMinesNotOpened = (this.rows * this.cols) - this.mines;
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
        this.field[i][j].updateFieldView("flag");
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
};




Board.prototype.createBoard = function(){
  var html ='';
  // var type= "closed";
  this.field = new Array(this.rows);
  for( var i =1 ; i<= this.rows ; i++){

    this.field[i]= new Array(this.cols);
    html += '<div class="row">';

    for( var j=1; j<= this.cols; j++){

      this.field[i][j] = new Field(i, j,this.rows,this.cols);
      html+= '<span class="' + this.field[i][j].status + '" id="'+this.field[i][j].id+'">'+this.field[i][j].symbol+'</span>'
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
      tot = 0;
          for(var z = 0; z < neighbours.length ; z++){
              row = i + neighbours[z][0];
              col = j + neighbours[z][1];
                  if(this.fieldExists(row,col)){ //check if a field with that particular coordinates fieldExists
                            if(this.field[row][col].isMine()){
                                tot +=1;
                            }
                  }

              this.field[i][j].mineCount = tot;

            }
        } 


    }
  }

};
Board.prototype.clickField  = function(id, typeofButton){
  coord = this.getRowColFromId(id);

if(typeofButton ==1 ){ //left click
  this.openField(coord.row, coord.col);
  return false;
}
else if(typeofButton ==3 ){
  coord = this.getRowColFromId(id);
  console.log("coordinates of field clicked"+ coord.row+ "and "+ coord.col);
//this.field[coord.row][coord.col].updateFieldView("flag");
if(this.field[coord.row][coord.col].isOpen()){
  return false;
}else
{
  this.changeState(coord.row,coord.col);
  return false;
}
}

};

Board.prototype.openField = function(row,col){
  var id = getIdFromRowCol(row,col,this.rows); //not needed
  console.log("id is "+ id + " row is "+ row + "col is "+ col);
  this.field[row][col].status = "open";
  if(this.field[row][col].isMine()){
    //game overteFieldView("blasrit");
      //trigger other gameover events here
      this.gameOverSolve(row,col);
      minesweeper.gameOver(); //minesweeper is global uncomment this line

  }else{

  if(this.field[row][col].mineCount ==0) //this contains no surrounding mines
    {
    //this.field[row][col].updateFieldView(this.field[row][col].mineCount);
      this.openConnectedEmptyFields(row,col);
    
    } else{
      this.field[row][col].updateFieldView(this.field[row][col].mineCount);
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


Board.prototype.gameOverSolve = function(row,col){

  for(var i =1; i<=this.rows; i++){

    for(var j =1; j<= this.cols; j++){

      if(this.field[i][j].isMine()){

        if(this.field[i][j].isFlag()){

          //no changes here
        }
        else{
        //if it is not flagged , then show the bomb here
        this.field[i][j].updateFieldView("mine");
        } 

      }
      else { //not a mine
      if(this.field[i][j].isFlag()){
      this.field[i][j].updateFieldView("cross");
      }


    }

  }
}
this.field[row][col].updateFieldView("blast");  //this is the mine that got blast

};



Board.prototype.openConnectedEmptyFields = function(currRow,currCol){
var id ;
  this.field[currRow][currCol].updateFieldView(this.field[currRow][currCol].mineCount);

  var neighbours = [[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];
  for(var z = 0; z < neighbours.length ; z++){
    id = '';
    row = currRow + neighbours[z][0];
    col = currCol + neighbours[z][1];
    if(this.fieldExists(row,col) && this.field[row][col].status =="closed"){ //check if a field with that particular coordinates fieldExists
        id = getIdFromRowCol(row,col,this.rows);
        this.clickField(id,1);
        console.log("empty field neighbour row col is" + row +"col is "+ col);

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
  var maxId = this.rows * this.cols;  
  if(id >0 && id <= maxId){
    return true;
  }
  return false;

};


Board.prototype.changeState = function(row,col){
  var change =  this.field[row][col].getNextState();
console.log("current state is "+ this.field[row][col].status);
console.log("new status is "+ change);
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
  this.updateRemainingMineCount();
  this.field[row][col].updateFieldView(change);

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



// RETURNS PSEUDO-RANDOM NUMBER IN RANGE min...max
function randomNumber(min,max) {

  return (Math.round((max-min) * Math.random() + min));
}

function getIdFromRowCol(row,col,totalRows){
  return (((row-1) * totalRows) + col);
//check here id should be between 1 and totalfields

}