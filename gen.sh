#!/bin/bash

for i in 3 4 5 6
do
	for x in 3 4 #5 6
	do
		for y in 4 5 # 6 7 8
		do
			node src/generate.js $i $x $y > games-${x}x$y-$i.tmp &
		done
	done
done
wait
