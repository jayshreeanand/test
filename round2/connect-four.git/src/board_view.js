/*
 * Given a Board, manage its html view, handle events and render animations
 */

var BoardView = function(boardElement, board) {
    this.el = boardElement
    this.board = board

    // Render all HTML.
    this.render();

    this.showCurrentPlayer();

    // Enable event listeners
    this.enableEventListeners();
};


// Get current active player's disc color
BoardView.prototype.getCurrentPlayerColor = function() {
    return this.board.getCurrentPlayer().getColor();
};

// toggle the player on the board and show that in UI
BoardView.prototype.toggleCurrentPlayer = function() {
    this.board.toggleCurrentPlayer();
    this.showCurrentPlayer();
};

BoardView.prototype.showCurrentPlayer = function() {
    var data = {
        locals: {
            player: this.board.getCurrentPlayer()
        }
    };

    var template = $("#current-player-template").html();
    var board_html = swig.render(template, data);
    $("#current-player").html(board_html);
}

BoardView.prototype.markAnimationStarted = function() {
    this.animationRunning = true;
};

BoardView.prototype.markAnimationEnded = function() {
    this.animationRunning = false;
};

BoardView.prototype.isAnimationRunning = function() {
    return this.animationRunning;
};

BoardView.prototype.getInsertRowCells = function() {
    return $(this.el).find(".insert-row .cell");
};

BoardView.prototype.enableEventListeners = function() {
    // Enable Hover listener
    this.enableHoverListener()

    // Enable click listeners
    this.enableClickListener();

    // Listen for game over event
    this.gameOverListener();
};

BoardView.prototype.enableHoverListener = function() {
    var $view = this;

    var insertRowCellElements = $view.getInsertRowCells()

    // Bind to hover mouseover and mouseout events
    $(insertRowCellElements).hover(
        function() {
            if(!$view.isAnimationRunning()) {
                $(this).addClass($view.getCurrentPlayerColor());
            }
        },
        function() {
            if(!$view.isAnimationRunning()) {
                $(this).removeClass($view.getCurrentPlayerColor());
            }
        }
    );
};

BoardView.prototype.enableClickListener = function() {
    var $view = this;

    var insertRowCellElements = $view.getInsertRowCells()

    $(insertRowCellElements).click(function() {
        // if animation is running, don't do anything
        if($view.isAnimationRunning()) {
            return false;
        }

        // another animation is not running. So mark animation started
        $view.markAnimationStarted();

        var target_el = this;
        var column = $(target_el).data("insertColumn");

        $view.playInsertDiscAnimation(column, function() {
            // reset the insert row cell to empty state
            $(target_el).removeClass("red").removeClass("green")

            // animation completely over. enable click listener
            $view.markAnimationEnded();

            // Because we pause hover handlers during animation,
            // the current insert row cell being hovered won't be active.
            // Trigger a mouseover over that element
            $view.recheckForHover();
        });
    });
};

// When game over, show winner, highlight connected cells and disable further moves on the board
BoardView.prototype.gameOverListener = function() {
    var $view = this;

    $($view.el).on('game-over', function(event, cells) {
        var player = cells[0].getPlayer();

        $view.showWinner(player);
        $view.highlightConnectedCells(cells);
        $view.disableBoard();
    });

};

// When you click and don't move, hover event listeners don't reactivate. so this fixes that
BoardView.prototype.recheckForHover = function() {
    var insertRowCellElements = this.getInsertRowCells()
    $.each(insertRowCellElements, function(index, element){
        if($(element).is(":hover")) {
            $(element).trigger("mouseover");
        }
    });
};

// render html board,
BoardView.prototype.render = function() {
    var data = {
        locals: {
            cells: this.board.getCells()
        }
    };

    var board_template = $("#board-template").html();
    var board_html = swig.render(board_template, data);
    $(this.el).html(board_html);
};


// Destory the view and all event listeners
BoardView.prototype.destroy = function() {
    $(this.el).empty();
}

// Main animation function to show disc insertion
BoardView.prototype.playInsertDiscAnimation = function(column, onCompleteFunc) {
    var $view = this;
    var row = this.board.getTopMostUnoccupiedCell(column);

    if(!this.board.isValidInsertion(row, column))  {
        alert("Duh! That column is full. Try another column :-)");
        onCompleteFunc.call();

        return;
    }

    // set disc in board model first
    this.board.insertDisc(row, column);

    // Calculate source cell and destination cell
    var source_cell = $(this.el).find(".cell[data-insert-column='" + column + "']");
    var destination_cell = $(this.el).find(".cell[data-row='"+ row + "'][data-column='" + column + "']");

    // Calculate displacement to be applied to the source cell
    var start_pos = $(source_cell).position()
    var end_pos = $(destination_cell).position()
    var displacement = {
        top: end_pos.top - start_pos.top
    }

    // Hide the downwards pointing arrow
    $(source_cell).find(".arrow").hide();

    // Animate the displacement. Apply custom easing to make it to look good
    $(source_cell).animate(displacement, "slow", "easeOutQuad", function() {
        // Now add disc to the destination cell
        $(destination_cell).addClass($view.getCurrentPlayerColor());

        // Animation is complete, now restore source cell to its original position
        $(source_cell).css({
            top: 'auto',
            left: 'auto'
        });

        // Show the arrow again
        $(source_cell).find(".arrow").show();

        if($view.board.isGameOver()) {
            var connectedCells = $view.board.getConnectedCells();
            $($view.el).trigger('game-over', [connectedCells]);
            return;
        }

        // current player turn is over, toggle player.
        $view.toggleCurrentPlayer();

        // reset Insert row cells to show new player's discs
        onCompleteFunc.call()
    });
};

// Show winner player once game is over
BoardView.prototype.showWinner = function(player) {
    var data = {
        locals: {
            winner: player
        }
    };

    var template = $("#winner-template").html();
    var board_html = swig.render(template, data);
    $("#current-player").html(board_html);
};

// highlight the connected cells.
BoardView.prototype.highlightConnectedCells = function(cells) {
    for(var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        var cellEl = $(this.el).find(".cell[data-row='"+ cell.row + "'][data-column='" + cell.column + "']");
        $(cellEl).addClass("highlighted");
    }
};

// disable insertion of discs.
BoardView.prototype.disableBoard = function() {
    $(".insert-row").empty();
};