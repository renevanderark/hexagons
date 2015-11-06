#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var debounce = require("lodash.debounce");

var baseDir = "./build";
var watchFiles = [
	baseDir + "/*.js",
	baseDir + "/index.html"
];



var onFilesChanged = function(event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
};

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));



browserSync.init({
	server: {baseDir: baseDir}
});


