#!/bin/bash

for i in 1 2 3 4 5 6
do
	for x in 3 4 #5 6 7 8
	do
		for y in 2 3 #4 5 6 7 8
		do
			node src/generate.js $i $x $y > src/games-${x}x$y-$i.js &
		done
	done
done
wait