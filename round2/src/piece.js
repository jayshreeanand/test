var Piece = function ( pieceName, square, boardPositions ) {

this.pieceName = pieceName;
this.boardPositions = boardPositions;
this.square = square;
square.piece = this;
this.hasMoved = false;
this.cell = cell; //this is the cell /square number
this.possibleMoves = [];


};

Piece.prototype.getPieceColor = function(pieceName){

//parse piece name and get color
if(pieceName.charAt(0)=='w'){
	this.color = 'w';
}
else {
	this.color = 'b';
}
return this.color;
};


Piece.prototype.getPieceType = function(pieceName){
	
//wq - implies queen
	this.type = pieceName.charAt(1);
	return this.type;

};

Piece.prototype.getPieceBehaviour = function(){

	switch(this.type)
	case Piece.p:  //this is a pawn

		if((this.color =='w' && this.square.row ==2)||(this.color='b' && this.square.row ==7)){ //this means the pawn hasn't moved yet

			//this.hasMoved = false;
			this.possibleMoves = [[0,1],[0,2]];
			//row + 1 or row+ 2
		}
		 else {

		 	this.possibleMoves = [[0,1]];
		 }
		 //write additional case for en-passant capture here

	break;

	case Piece.r:
		this.possibleMoves =[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],[0,-8],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0],[-8,0]];
		break;
	case Piece.b:
		this.possibleMoves = [[2,1].[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]];
		break;
	case piece.n:
		this.possibleMoves = [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7],[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]];		
		break;
	case piece.q:
		this.possibleMoves = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],[0,-8],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0],[-8,0][1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7],[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]];
		break;
	case piece.k:
		this.posisbleMoves =[[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,1],[1,-1],[-1,-1]];
		break;
};


Piece.prototype.getPossibleMoves = function() {
	//this is a overlap of piece behaviour and current board positions

};

Piece.prototype.getCurrentAllowedMoves = function() {


};

Piece.prototype.specialMoves = function() {


};


