/*global _:true, T3:true */

T3.Model = function() {
	this.size = 3;
	this.players = [new T3.Player('X'), new T3.Player('O')];
	this.currentPlayer = {};
	this.board = [];
	for (var x = 0; x < this.size; x++) {
		this.board[x] = [];
		for (var y = 0; y < this.size; y++) {
			this.board[x][y] = null;
		}
	}
};

T3.Model.prototype.restart = function() {
	this.currentPlayer = this.players[Math.floor(Math.random() * 2)];
	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {
			this.board[x][y] = null;
		}
	}
};

T3.Model.prototype.move = function(x, y) {
	if (view.winner === null) {
		if (this.board[x][y] === null) {
			this.board[x][y] = this.currentPlayer;

			//I need to think of a better way to do this
			if (this.currentPlayer.name === 'X') {
				this.currentPlayer = this.players[1];
			} else if (this.currentPlayer.name === 'O') {
				this.currentPlayer = this.players[0];
			}
		}
	}
};

T3.Player = function(name) {
	this.name = name;
};