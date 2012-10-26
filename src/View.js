/*global _:true, T3:true, $:true */

T3.View = function(model) {
	this.model = model;
	this.canvas = $("#canvas");
	this.ctx = this.canvas[0].getContext("2d");

	var width = this.canvas.width();
	var height = this.canvas.height();

	this.ctx.scale(width, height);

	this.pixel = 1 / width;

	this.canvas.click(_.bind(this._mouseClick, this));
};

T3.View.prototype._mouseClick = function(event) {
	var pixelX = event.pageX - this.canvas.offset().left;
	var pixelY = event.pageY - this.canvas.offset().top;
	
	var x = Math.floor(pixelX / 100);
	var y = Math.floor(pixelY / 100);

	this.model.move(x, y);
	this.update();
};

T3.View.prototype.update = function() {
	$('#status').text(this.model.currentPlayer.name + "'s Turn");
	this._draw();
};

T3.View.prototype._draw = function() {
	this.ctx.save();
	this.ctx.clearRect(0, 0, 1, 1);

	this._drawBoard();

	this._drawShapes();
	
	this.ctx.restore();
};

T3.View.prototype._drawBoard = function() {

	this.ctx.beginPath();
	this._drawRowLines();
	this._drawColumnLines();
	this._stroke(1 / 9, 'black');
};

T3.View.prototype._drawRowLines = function() {
	var size = this.model.size;
	var nudge = this.pixel / 2;
	for(var y = 1; y < size; y++) {
		var py = (y / size);
		this.ctx.moveTo(0, py + nudge);
		this.ctx.lineTo(1, py + nudge);
	}
};

T3.View.prototype._drawColumnLines = function() {
	var size = this.model.size;
	var nudge = this.pixel / 2;
	for(var x = 1; x < size; x++) {
		var px = (x / size);
		this.ctx.moveTo(px + nudge, 0);
		this.ctx.lineTo(px + nudge, 1);
	}
};

// Determines the propper shape to draw for each square
T3.View.prototype._drawShapes = function() {
	var size = this.model.size;
	for (var x = 0; x < size; x++) {
		for (var y = 0; y < size; y++) {
			var newX = x / size;
			var newY = y / size;
			this.ctx.beginPath();
			//console.log(this.model.board[x][y].name);
			if (this.model.board[x][y].name === 'X') {
				this._drawX(newX, newY);
			} else if (this.model.board[x][y].name === 'O') {
				this._drawO(newX, newY);
			}
			this._stroke(1 / 2, 'black');
		}
	}
};

T3.View.prototype._drawX = function(x, y) {
	var indent = .9 / this.model.size
	var indent2 = .1 / this.model.size
	this.ctx.moveTo(x + indent2, y + indent2);
	this.ctx.lineTo(x + indent, y + indent);
	this.ctx.moveTo(x + indent, y + indent2);
	this.ctx.lineTo(x + indent2, y + indent);
};

T3.View.prototype._drawO = function(x, y) {
	var size = this.model.size;
	this.ctx.arc(x + .5 / size, y + .5 / size, .45 / size, 0, 2 * Math.PI);
};

T3.View.prototype._stroke = function(pixelWeight, color) {
	this.ctx.strokeStyle = color;
	this.ctx.lineWidth = this.pixel * pixelWeight;
	this.ctx.stroke();
};