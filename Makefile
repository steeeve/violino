js_files=$(shell find src/js -name *.js)
js_test_files=$(shell find test -name *_test.js)
sass_files=$(shell find src/sass -name *.sass)
haml_files=$(shell find src -name *.haml)

publish: build
	rm -rf dist
	cp -r build dist
	uglifyjs build/js/app.js > dist/js/app.js
	git add dist
	git commit -m "Build dist"
	git subtree push --prefix dist origin gh-pages

jshint: $(js_files) $(js_test_files)
	@jshint src/js/**/*.js

mocha: jshint $(js_files) $(js_test_files)
	@mocha test

clean:
	rm -rf build
	rm -rf dist

js: mocha $(js_files) $(js_test_files)
	@mkdir -p build/js
	@browserify src/js/app.js > build/js/app.js
	@echo "built js."

css: $(sass_files)
	@mkdir -p build/css
	@sass src/sass/app.sass > build/css/app.css
	@echo "built css."

html: $(haml_files)
	@mkdir -p build
	@find src -name \*.haml -print | sed 'p;s/.haml/.html/;s/^src/build/' | xargs -n2 haml
	@echo "built html."

watch: build
	@fswatch -o src -l 1 | xargs -n1 -I{} make build
	@echo "Watching for changes..."

serve:
	http-server build -p 5000

build: js css html
	@echo "build complete."

.PHONY: serve watch build publish dist mocha jshint js css html
