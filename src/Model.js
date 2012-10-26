/*global _:true, T3:true */

T3.Model = function() {
	this.size = 3;
	this.players = [new T3.Player('X'), new T3.Player('O')];
	this.currentPlayer = {};
	this.board = [];
	for (var x = 0; x < this.size; x++) {
		this.board[x] = [];
		for (var y = 0; y < this.size; y++) {
			this.board[x][y] = this.players[Math.floor(Math.random() * 2)];
		}
	}
};

T3.Model.prototype.restart = function() {
	this.currentPlayer = this.players[Math.floor(Math.random() * 2)];
};

T3.Model.prototype.move = function(x, y) {
	this.board[x][y] = this.currentPlayer;
	this.board[x][y].name = this.currentPlayer.name;

	//I need to think of a better way to do this
	if (this.currentPlayer.name === 'X') {
		this.currentPlayer.name = 'O';
	} else if (this.currentPlayer.name === 'O') {
		this.currentPlayer.name = 'X';
	}
};

T3.Player = function(name) {
	this.name = name;
};