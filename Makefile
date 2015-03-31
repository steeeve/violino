js_files=$(shell find src/js -name *.js)
js_test_files=$(shell find test -name *_test.js)
sass_files=$(shell find src/sass -name *.sass)
haml_files=$(shell find src -name *.haml)

dist:
	rm -rf dist
	cp -r build dist
	#find src -name \*.js -print | sed 'p;s/^build/dist/' | xargs -n2 -I % uglifyjs % -o %

lib: src/lib
	mkdir -p build
	cp -r src/lib build/lib

jshint: $(js_files) $(js_test_files)
	jshint src/js/**/*.js

mocha: jshint $(js_files) $(js_test_files)
	mocha test

js: mocha $(js_files) $(js_test_files)
	mkdir -p build/js
	browserify src/js/app.js > build/js/app.js

css: $(sass_files)
	mkdir -p build/css
	sass src/sass/app.sass > build/css/app.css

html: $(haml_files)
	mkdir -p build
	find src -name \*.haml -print | sed 'p;s/.haml/.html/;s/^src/build/' | xargs -n2 haml

watch: build
	fswatch -o src -l 1 | xargs -n1 -I{} make js

serve:
	http-server build -p 5000

build: js css html lib
