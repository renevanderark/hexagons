#!/usr/bin/node
require("babel/register");
var api = require("./api");

var F = parseInt(process.argv[2]);
var W = parseInt(process.argv[3]);
var H = parseInt(process.argv[4]);
var games = {};

games = [];
for(var i = 0; i < 10000; i++) {
	var game = api.makeGrid(W, H, F);
	game.numFlows = F;
	game.width = W;
	game.height = H;
	games.push(game);
}
games.sort(function(a, b) {
	return b.difficulty - a.difficulty;
});
games = games.filter(function(g, j) { return j < 250; });
games.sort(function(a, b) {
	return a.difficulty - b.difficulty;
});
process.stderr.write(W + "x" + H +"-" + F + "\n");
console.log("\"" + W + "x" + H +"-" + F + "\":" +
	JSON.stringify(games) + ",\n"
);
