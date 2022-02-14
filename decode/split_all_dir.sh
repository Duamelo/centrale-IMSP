#!/bin/bash
where=$1
number=$2
cd $1
dir=$(ls)

for d in $dir
do
    echo $d
    ../split_files.sh $d $2
done