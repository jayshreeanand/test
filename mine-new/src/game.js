var Game = function(){

  this.timerElement  = document.getElementById("timer");
  var game = this;
// $("#myModal").modal('show');
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

Game.prototype.start = function(){


  this.options = this.getUserOptions();
  console.log("saving to local storage" + "rows "+ this.options[0] + "mine count" + this.options[2] );
  var abc = JSON.stringify(this.options);
  localStorage.setItem("game-data",abc);
  console.log("abc is this"+ abc);
  var xyz = localStorage.getItem("game-data");
  console.log("xyz is this" + xyz);
  var pqr = xyz;
  console.log("pqr is this "+ pqr);
  this.startTime = null;
  this.timerElement.innerHTML = "00:00";
  // this.movesArray = new Array();
  this.board = new Board( this.options);
  // this.startTimer();
  this.enableClickListener();
};

Game.prototype.startTimer = function(){
  this.startTime = new Date().getTime();
  this.initTimer();
};



Game.prototype.restart = function(){
  this.board.element.empty();
  this.board.element.unbind();

  this.start();
};
Game.prototype.checkWinGame = function(){
  if(this.board.matchFlagsMines){
    this.winGame();

  }
};

Game.prototype.endGame =function(){
  this.stopTimer();
  this.disableClickListener();
}

Game.prototype.gameOver = function(row,col){
//loose game message here
window.setTimeout(function() { window.alert ('Game Over!');}, 100);
this.endGame();
}


Game.prototype.winGame = function() {
//win game message here
window.setTimeout(function() { window.alert ('You Win!');}, 100);
this.board.showFlags();
this.endGame();
};


Game.prototype.enableClickListener = function() {
  var id, typeofButton;
  var $game = this;
    this.board.element.contextmenu(function(e) {
    console.log("right click button pressed on id "+ e.target.id + "and button is " +e.which);
    id = e.target.id;
    typeofButton = 3; //this is a right mouse button
    e.preventDefault();
    $game.board.clickField(id, typeofButton);
    // $game.logMoves(id, typeofButton);
    return; 
});


  this.board.element.click(function(event) {
    if(!$game.startTime){
      $game.startTimer();
    }


if(event.which ==1){ //eliminates case for middle mouse button click
  var target_el = event.target;
  console.log("the id of the element being cicked is "+ target_el.id +" mouse button is" + event.which);
  id = target_el.id;
  typeofButton = event.which;
  $game.board.clickField(id, typeofButton);
  // $game.logMoves(id, typeofButton);

}

});

// this.board.clickField(id, typeofButton);

};


Game.prototype.disableClickListener = function() {


  this.board.element.unbind();
};


Game.prototype.stopTimer = function(){

  this.startTime = null;

}

Game.prototype.getUserOptions = function(){
  var difficulty = document.getElementById("difficulty-level").value;

  switch(difficulty){

    case "easy":
    return [10,10,10];
    break;

    case "medium":
    return [15,15,50];

    break;

    case "hard":
    return [20,20,70];

    break;

    default:
    return  [10,10,10];

    break;

  }

};





/*Game.prototype.logMoves = function(id, typeofButton){
  this.movesArray.push([id,typeofButton]);
  console.log("the element inserted is with id"+ this.movesArray[this.movesArray.length -1][0] + " and with type of click as "+ this.movesArray[this.movesArray.length -1][1] );

};

Game.prototype.deleteLastMove = function(){

  this.movesArray.pop();
};
*/