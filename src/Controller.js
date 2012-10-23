/*global $:true, document:true, T3:true */

T3.Controller = function() {
	model = new T3.Model();
	view = new T3.View(model);

	model.restart();
	view.update();
};

//this function is called once the page is done loading
$(document).ready(function() {
	new T3.Controller();
$ ("#restart").click(function() {
	model.restart();
	view.update();
}); 
});