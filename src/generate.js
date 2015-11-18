require("babel/register");
var util = require('util');
var api = require("./api");

var F = 4;
var W = 4;
var H = 3;
var games = [];
for(var i = 0; i < 1000; i++) {
	var game = api.makeGrid(W,H,F);
	game.numFlows = F;
	game.width = W;
	game.height = H;
	games.push(game);
}

games.sort(function(a,b) {
	return b.difficulty - a.difficulty;
});
games = games.filter(function(g,i) { return i < 100; });

games.sort(function(a,b) {
	return a.difficulty - b.difficulty;
});

console.log("export default " +
	JSON.stringify(games) +
	";"
);
