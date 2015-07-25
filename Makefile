#
# Vars
#

NODE_BIN = ./node_modules/.bin
BUILD_ARGS = client.js -t babelify -o build/build.js -v

#
# Tasks
# 

clean:
	@rm node_modules/components &> /dev/null || true
	@rm node_modules/lib &> /dev/null || true
	@rm -rf build

link: clean
	@ln -s ${PWD}/components node_modules/components
	@ln -s ${PWD}/lib node_modules/lib

dir:
	@mkdir -p build

lr: dir
	@${NODE_BIN}/tiny-lr-it build

watch: link dir
	@${NODE_BIN}/watchify ${BUILD_ARGS} -d

build: link dir
	@${NODE_BIN}/browserify ${BUILD_ARGS}

start:
	@node server.js

validate:
	@${NODE_BIN}/noiit
	@${NODE_BIN}/jshint client.js server.js **/*.js

test:
	@${NODE_BIN}/mocha

dev:
	@make lr &
	@make watch &
	@make start


.PHONY: test validate start clean link build