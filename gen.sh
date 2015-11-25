#!/bin/bash

for i in 3 4 5 6
do
	for x in 5 6
	do
		for y in 6
		do
			node src/generate.js $i $x $y > games-${x}x$y-$i.tmp &
		done
	done
done
wait
