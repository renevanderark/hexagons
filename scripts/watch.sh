#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
  --detect-globals true \
  --extension=.jsx \
  --outfile 'node_modules/.bin/derequire > build/index.js' \
  --standalone Gm \
  --transform [ babelify ] \
  --verbose &

node_modules/.bin/watchify src/menu.jsx \
  --detect-globals true \
  --extension=.jsx \
  --outfile 'node_modules/.bin/derequire > build/menu.js' \
  --standalone Gm \
  --transform [ babelify ] \
  --verbose