#
# Vars
#

NODE_BIN = ./node_modules/.bin
BUILD_ARGS = client.js -g reactify -o build/build.js -v

#
# Tasks
# 

clean:
	@rm node_modules/components &> /dev/null || true

link: clean
	@ln -s ${PWD}/components node_modules/components

dir:
	@mkdir build &> /dev/null || true

lr: dir
	@${NODE_BIN}/tiny-lr-it build

watch: dir link
	@${NODE_BIN}/watchify ${BUILD_ARGS}

build: dir link
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