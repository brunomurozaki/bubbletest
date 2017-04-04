#!/bin/bash

echo "add"
git add .

echo "commit"
git commit -m"$1"

echo "push to heroku"
git push heroku master