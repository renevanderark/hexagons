require("babel/register");
var util = require('util');
var api = require("./api");

var games = [];
for(var i = 0; i < 1000; i++) {
	games.push(api.makeGrid(4, 4, 4))
}

games.sort(function(a,b) {
	return b.difficulty - a.difficulty;
});

console.log(
	JSON.stringify(games.filter(function(g,i) { return i < 100; }))
);
