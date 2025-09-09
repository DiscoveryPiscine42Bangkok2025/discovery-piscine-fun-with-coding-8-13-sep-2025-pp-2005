#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments provided."
else 
	for subfix in $@
	do
		touch "ex"$subfix
	done
fi