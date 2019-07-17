#!/bin/bash

git init
git config user.name akiljames83
git config user.email akil.james83@gmail.com

npm set init.author.name "Akil Hamilton"
npm set init.version "1.0.0"
npm init -y

npm i --save request-promise \
	express express-session \
	ejs body-parser

touch index.js
mkdir public/ routes/
echo "node_modules/" > .gitignore
 
git add -A
git commit -m "Initial commit"
