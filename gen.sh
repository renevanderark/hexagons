#!/bin/bash

for i in 3 4 5 6
do
	for x in 3 4
	do
		for y in 5
		do
			node src/generate.js $i $x $y &
		done
	done
done
wait
