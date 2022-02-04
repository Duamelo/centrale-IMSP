#!/bin/bash
where=$1
size=$2
cd $1

FILES=$(ls)

for i in $FILES 
do 
    parent=$(echo "$i" | cut -f 1 -d '.') 
    echo $parent
    mkdir -p $parent
    mv $i $parent
    cd $parent 
    split -d -l $2 $i $i
    mv $i ..
    cd ..
done




# hachage par index : a partir d'un élément un recherche un ensemble de données
