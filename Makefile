js_files=$(shell find src/js -name *.js)
js_test_files=$(shell find test -name *_test.js)
sass_files=$(shell find src/sass -name *.sass)
haml_files=$(shell find src -name *.haml)

clean:
	rm -rf dist

lib: src/lib
	cp -r src/lib dist/lib

jshint: $(js_files) $(js_test_files)
	jshint src/js/**/*.js

mocha: jshint $(js_files) $(js_test_files)
	mocha test

dist/js/app.js: mocha $(js_files) $(js_test_files)
	mkdir -p dist/js
	browserify src/js/app.js > dist/js/app.js

dist/css/app.css: $(sass_files)
	mkdir -p dist/css
	sass src/sass/app.sass > dist/css/app.css

html: $(haml_files)
	find src -name \*.haml -print | sed 'p;s/.haml/.html/;s/^src/dist/' | xargs -n2 haml

build: dist/js/app.js dist/css/app.css html lib
