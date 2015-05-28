#! /usr/bin/env sh

NODE_ENV=test NODE_PATH=lib ./node_modules/.bin/mocha --harmony test/**/*

