#!/usr/bin/node
require("babel/register");
var api = require("./api");
var fs = require("fs");

var F = parseInt(process.argv[2]);
var W = parseInt(process.argv[3]);
var H = parseInt(process.argv[4]);
var games = {};
var key = W + "x" + H +"-" + F;
games = [];
for(var i = 0; i < 10000; i++) {
	var game = api.makeGrid(W, H, F);
	game.numFlows = F;
	game.width = W;
	game.height = H;
	games.push(game);
	if(i % 100 === 0) {
		process.stderr.write(key + ": " + i + "\n");
	}
}

process.stderr.write(key + ": done\n");
games.sort(function(a, b) {
	return b.difficulty - a.difficulty;
});
games = games.filter(function(g, j) { return j < 1000; });
games.sort(function(a, b) {
	return a.difficulty - b.difficulty;
});

for(var i in games) {
	fs.writeFile(key + "." + i + ".html", "<html><meta name='viewport' content='initial-scale=1.0, user-scalable=no' /><link rel='stylesheet' type='text/css' href='style.css' /><body><h1>Fluxagon loading!</h1></body><script type='text/javascript'>" +
		"var game = " + JSON.stringify(games[i]) + ";" +
		"</script><script src='index.js'></script></html>"
	);
}
