
  var Game = function() {
    var game = this;
    this.movesArray = new Array();
      this.startTime = null;
  // this.board = new Board(10,10,10);
   

    this.onMouseDown = function(e) {
     
      var obj = getMouseObject(e);
      if ( game.board.isField(obj) ){

        if(!game.startTime){
            game.startTimer();


        }
        if ( getMouseButton(e) == 1)
          game.onLeftClick(obj.rowId, obj.colId);
        else
          game.onRightClick(obj.rowId, obj.colId);
      }
      game.updateRemainingMinesCount();
      return false;
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

    
    
  }

Game.prototype.logMoves = function(){
this.movesArray.push([id,typeOfClick]);

};

Game.prototype.deleteLastMove = function(){

this.movesArray.pop();
};

  Game.prototype.start = function() {
       this.createBoard();
      this.enableClickListener();
      this.updateRemainingMinesCount();
       document.getElementById("timer").innerHTML ="00:00";

    };
    Game.prototype.restart = function() {
      this.board.destroyView();
      this.start();
    };

    Game.prototype.createBoard = function() {

      this.difficulty = document.getElementById("difficulty-level").value;

       switch( this.difficulty ) {
         case "easy"    :
           this.board = new Board(10, 10,  10);
           break;
         case "medium":
            this.board = new Board(15, 15,  50);
            break;
         case "hard": 
            this.board = new Board(18, 25,  75); 
            break;
       }
    };

     


  /*
  Click handlers here

  */
  Game.prototype.enableClickListener = function() {
      this.board.boardElement.onmousedown   = this.onMouseDown;
      this.board.boardElement.oncontextmenu = function(){return false;};
    };
    Game.prototype.disableClickListener = function() {
      this.board.boardElement.onmousedown = null;
    };

    Game.prototype.onLeftClick = function(row, col) {
      if ( this.board.isFlag(row, col) )
        return;
      if ( this.board.isMine(row, col) ) {
        this.gameOver(row, col);
        return;
      }
      this.board.clickField(row, col);
      if (0 == this.board.noMineFields)
        this.winGame();
    };
   

   Game.prototype.onRightClick = function(row, col) {
      if ( this.board.isOpen(row, col) )
        return;
      this.board.changeStatus(row, col);
      if (this.board.flags == this.board.mineCount)
        this.testWinGame();
    }
   
  Game.prototype.testWinGame = function(){

    if(this.board.matchFlagsMines()){
      this.winGame();

    }
  }

  Game.prototype.winGame = function() {
  //win game message here
  window.setTimeout(function() { window.alert ('You Win!');}, 100);
  this.board.showFlags();
  this.endGame();


  }

  Game.prototype.gameOver = function(row,col){
  //loose game message here
    window.setTimeout(function() { window.alert ('Game Over!');}, 100);
    this.board.traverseMines(row,col);
    this.endGame();

  }


  Game.prototype.endGame =function(){

  this.stopTimer();
  this.disableClickListener();
  }


  Game.prototype.updateRemainingMinesCount = function() {

    document.getElementById("remaining-mines").innerHTML = String(this.board.mineCount - this.board.flags);
  }

  Game.prototype.startTimer = function(){
    this.startTime = new Date().getTime();
    this.initTimer();


  }

  Game.prototype.stopTimer = function(){

  this.startTime = null;

  }



  function generateRandomNumber(max) {

  /* returns a number between 0 and max*/

    return( Math.floor( Math.random() * max ) );
  }

  function getMouseObject(e) {

    /* returns the mouse target element*/
    return(e? e.target: window.event.srcElement);
  }
  function getMouseButton(e) {
    /* returns the mouse button  1 => left button, 0 => right button*/
    return(e? e.which: window.event.button);
  }

    