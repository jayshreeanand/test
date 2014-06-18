  var Board =function(rows, cols, mineCount) {

    this.boardElement = document.getElementById("game-board");
    this.divClass  = "field";

      this.fields = null;
      this.rows  = rows;
      this.cols  = cols;
      this.mineCount = mineCount;
      this.noMineFields = (this.rows * this.cols) - this.mineCount;
      this.flags = 0;

      this.createGrid();
      this.plantMines();
      this.createView();
  };
    
   
      Board.prototype.createGrid = function() {
        this.fields = new Array(this.rows);
        for (var row = 0; row != this.rows; ++ row) {
          this.fields[row] = new Array(this.cols);
          for (var col = 0; col != this.cols; ++ col)
          {

            this.fields[row][col] = new Field();

         }
       }


      }
    
    Board.prototype.plantMines = function() {
      var row, col;
      for (var mine = 0; mine != this.mineCount; ++ mine)
      {

        do{
        row = generateRandomNumber(this.rows);
        col = generateRandomNumber(this.cols);
      }while( this.isMine(row, col) );
   
      this.fields[row][col].value = 'm'; //plant mine here
      for (var rowno = Math.max(row - 1, 0); rowno <= Math.min(row + 1, this.rows - 1); ++ rowno)
      {
        for (var colno = Math.max(col - 1, 0); colno <= Math.min(col + 1, this.cols - 1); ++ colno)
        {
          if ( this.isMine(rowno, colno) == false)
          {
            ++ this.fields[rowno][colno].value;
          }
        }
      }
    }
    }
   

    Board.prototype.createView = function() {
      for (var row = 0; row != this.rows; ++ row)
      {
        for (var col = 0; col != this.cols; ++ col)
        {
          this.createFieldElement(row, col);
        }
      }
    };
    
    Board.prototype.destroyView = function() {
      for (var row = 0; row != this.rows; ++ row)
      {
        for (var col = 0; col != this.cols; ++ col)
        {
      this.boardElement.removeChild( document.getElementById( this.getDivId(row, col) ) );
      // this.boardElement.removeChild( document.getElementById( this.getDivId(row, col) ) );
        }

      }

    };
    Board.prototype.getDivElement = function(row, col) {
      return( document.getElementById( this.getDivId(row, col) ) );
    }
    Board.prototype.getDivId = function(row, col) {
      return( this.divClass + String( (row * this.cols) + col) );
    }
    Board.prototype.getImgSrc = function(pic) {
      return(  "./img/" + pic + ".png" );
    }



    Board.prototype.clickField = function(row, col) {
      if ( this.isOpen(row, col) )
      {
     //  this.clickOpenedField(row,col);
     //write new function for this  - that exposes all surrounding a field when an already opened field is clicked
        return;
      }
      if ( this.isFlag(row, col) )
      {
        return;
      }

      this.openField(row,col);
      
     //this.getDivElement(row, col).className = this.getImgSrc( this.fields[row][col].value);  

      -- this.noMineFields;


      if ( this.isHole(row, col) )
      {
        this.openConnectedHoles(row, col);
      }
     
    };
    
       Board.prototype.clickOpenedField = function(row, col){ //clicking on an already open field - either a numbered one, or a hole
       var hasLeft  = (col > 0);
      var hasRight = (col < this.cols - 1);
      if (row > 0) {
        if (hasLeft) this.openField(row - 1, col - 1);
        this.openField(row - 1, col);
        if (hasRight) this.openField(row - 1, col + 1);
      }
      if (hasLeft) this.openField(row, col - 1);
      if (hasRight) this.openField(row, col + 1);
      if (row < this.rows - 1) {
        if (hasLeft) this.openField(row + 1, col - 1);
        this.openField(row + 1, col);
        if (hasRight) this.openField(row + 1, col + 1);
      }
      };

       Board.prototype.openField = function(row,col){

      this.getDivElement(row, col).src = this.getImgSrc( this.fields[row][col].value );
      this.fields[row][col].currStatus = "open";


       };


      Board.prototype.openConnectedHoles = function(row, col) {
      var hasLeft  = (col > 0);
      var hasRight = (col < this.cols - 1);
      if (row > 0) {
        if (hasLeft) this.clickField(row - 1, col - 1);
        this.clickField(row - 1, col);
        if (hasRight) this.clickField(row - 1, col + 1);
      }
      if (hasLeft) this.clickField(row, col - 1);
      if (hasRight) this.clickField(row, col + 1);
      if (row < this.rows - 1) {
        if (hasLeft) this.clickField(row + 1, col - 1);
        this.clickField(row + 1, col);
        if (hasRight) this.clickField(row + 1, col + 1);
      }
    }

    Board.prototype.changeStatus = function(row, col) {
      var change = this.getNextStatus(row, col);
      if ( ("flag" == change) && (this.flags == this.mineCount) )
        return;  //Don't allow more number of flags than the mineCount

      if ("flag" == change)
        ++ this.flags;
      if ("question" == change)
        -- this.flags;

      this.getDivElement(row, col).src = this.getImgSrc(change);
     //this.getDivElement(row, col).className = String(change);

      this.fields[row][col].currStatus = change;
    }



    Board.prototype.getNextStatus = function(row, col) {

      //on right click these are the status order to be followed --  closed --> flag --> question -->closed
      switch( this.fields[row][col].currStatus ){
        case "closed": 
            return("flag");
        case "flag"    : 
            return("question");
        case "question": 
            return("closed");
      }
    }

    Board.prototype.matchFlagsMines = function() {
      for (var row = 0; row != this.rows; ++ row)
      {
        for (var col = 0; col != this.cols; ++ col)
        {
          if ( this.isFlag(row, col) && ( this.isMine(row, col) == false ) )
            return false;
      return true;
        }
      }

    }

    Board.prototype.traverseMines = function(firedRow, firedCol) {
      for (var row = 0; row != this.rows; ++ row)
      {
        for (var col = 0; col != this.cols; ++ col)
        {
          if ( this.isMine(row, col) || this.isFlag(row, col) )
            this.revealMines(row, col, firedRow, firedCol);
        }
      }

    }
    Board.prototype.revealMines = function(row, col, firedRow, firedCol) {
      var src = "mine";
      if ( this.isFlag(row, col) )
      {
         src = this.isMine(row, col)? "flag" : "cross";
      }
      if ( (row == firedRow) && (col == firedCol) )
      {
        src = "fired";
      }

      this.getDivElement(row, col).src = this.getImgSrc(src);
      //this.getDivElement(row, col).className = String(pic);
      

    }
    Board.prototype.showFlags = function() {
      for (var row = 0; row != this.rows; ++ row)
      {
        for (var col = 0; col != this.cols; ++ col)
        {
          if ( this.isMine(row, col) && ( this.isFlag(row, col) == false) ){
  this.getDivElement(row, col).src = this.getImgSrc("flag");

          //  this.getDivElement(row, col).className = "flag";
            ++ this.flags;
          }
        }
      }
    }

    Board.prototype.isMine = function(row, col) {
      return( 'm' == this.fields[row][col].value );
    }
    Board.prototype.isHole = function(row, col)
    {
      return( 0 == this.fields[row][col].value );
    }
    
    Board.prototype.isFlag = function(row, col) {
      return( 'flag' == this.fields[row][col].currStatus );
    }
    Board.prototype.isOpen = function(row, col) {
      return( 'open' == this.fields[row][col].currStatus );
    }

    Board.prototype.isField = function(obj) {
      return(obj.className == this.divClass);
    }
   

  Board.prototype.createFieldElement = function(row, col) {
      var div = document.createElement("img");
      div.id           = this.getDivId(row, col);
      div.className    = this.divClass;
      div.style.top    = String(( row * (32 - 1)))  + "px";
      div.style.left   = String(( col * (32 - 1)))  + "px";
      div.src          = this.getImgSrc("closed");
      div.rowId         = row;
      div.colId         = col;
      this.boardElement.appendChild(div);
    }

