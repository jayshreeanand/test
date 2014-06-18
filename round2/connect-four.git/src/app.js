/*
 * Overall Game app. Creates a board and initializes a board view to play the game
 */
var ConnectFourApp = function(boardElement, userOptions) {
    var defaultOptions = {
        "width": 7,
        "height": 6
    };

    this.el = boardElement;
    this.options = $.extend({}, defaultOptions, userOptions);

    // listen to new game and board size change triggers
    this.enableEventListeners();

    // Start the game
    this.initGame();
};

ConnectFourApp.prototype.initGame = function() {
    var players = this.initPlayers();


    // Create a board with specified width and height with all empty cells
    this.board = new Board(this.options.width, this.options.height, players);

    // Create a view to show the board
    this.view = new BoardView(this.el, this.board);
}

ConnectFourApp.prototype.initPlayers = function() {
  var player1 = new Player("Player 1", "green")
  var player2 = new Player("Player 2", "red");

  return {green: player1, red: player2};
};

ConnectFourApp.prototype.enableEventListeners = function() {
    var $app = this;

    $("[data-action='new-game']").click(function(){
        $app.view.destroy();
        $app.initGame();

        return false;
    });

    $("[data-action='resize-board']").click(function(){
        $("[data-action='resize-board'").removeClass("btn-primary");
        $(this).addClass("btn-primary");

        $app.view.destroy();

        $app.options.width = parseInt($(this).data('cols'));
        $app.options.height = parseInt($(this).data('rows'));

        $app.initGame();

        $("#size-modal").modal('hide');

        return false;
    });
};