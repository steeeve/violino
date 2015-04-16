'use strict';

var PIXI = require('pixi.js');

var Renderer = function(width, height) {
  this.width = width;
  this.height = height;
  this.setup();
};

Renderer.prototype.setup = function setup() {
  this.stage = new PIXI.Stage(0xFFFFFF, true);
  this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { antialias: true, resolution: 1 } );
  document.getElementById('canvas').appendChild(this.renderer.view);
};

Renderer.prototype.render = function render() {
  this.renderer.render(this.stage);
};

Renderer.prototype.scaleX = function scaleX(x) {
  return this.width * x / 100;
};

Renderer.prototype.scaleY = function scaleY(y) {
  return this.height * y / 100
};

module.exports = Renderer;
