#!/bin/bash
for i in 512 256 128 90 64 60 48 32 16
do
convert logo.png -resize $i public/images/$i.png
done

