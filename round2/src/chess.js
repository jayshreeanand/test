
var ChessGame = function (board, userOptions){

    //extend user options later
var defaultOptions = {
        "firstPlayer" : "white"

    };
this.initGame();
 this.drawBoard();
}


ChessGame.prototype.initGame = function (){
    var board = [['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
             ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
             ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']];

    this.board = board;
   
}

ChessGame.prototype.drawBoard = function (){
    var str = '';
    for( var i = 0 ; i < 8 ; i++ ){
        str += '<div class="row">';
        for( var j = 0 ; j < 8 ; j++ ){
            str += '<div class="column ' +
            ( (i + j) % 2 === 0 ? 'light': 'dark') + '">' +
            '<div class="' + this.board[i][j] + '"></div>' +
            '</div>';
        }
        str += '</div>';
    }
    $('#board').append(str);



}
/*var ChessGame = function(boardElement, userOptions) {

    var defaultOptions = {
        "firstPlayer" : white

    };

    this.el = boardPositions;
    //extend user options here
    this.options = $.extend({}, defaultOptions, userOptions);
    this.enableEventListeners();
    this.initGame();

}

ChessGame.prototype.initGame = function(){
    var players = this.initPlayers();
    this.board = new Board( this.options.firstPlayer, players);
    this.view = new BoardView( this.el, this.Board);
}

ChessGame.prototype.initPlayers = function() {

    var player1 = new Player("Player 1", "white");
    var player2 = new Player("Player 2", "black");
    return {white: player1, black: player2};
}

ChessGame.prototype.enableEventListeners = function() {

    var $app = this;

    $("[data-action='reset-game']").click(function() {

        $app.view.destroy();
        $app.initGame();
        return false;

    });

    $("[data-action='change-options']").click(function(){  
    $("[data-action='change-options']").removeClass("btn-primary");
    $(this).addClass("btn-primary");
    $app.view.destroy();
    $app.options.firstPlayer = parseInt($(this).data('color'));

    $app.initGame();
    $("#options-modal").modal('hide');
    return false;

    });






};



*/