'use strict';

var PIXI = require('pixi.js');

var Renderer = function() {
  this.setup();
};

Renderer.prototype.setup = function setup() {
  this.stage = new PIXI.Stage(0xFFFFFF, true);
  this.renderer = PIXI.autoDetectRenderer(600, 300, { antialias: true, resolution: 1 } );
  // this.renderer.view.style.display = "block";
  document.getElementById('canvas').appendChild(this.renderer.view);
};

Renderer.prototype.render = function render() {
  this.renderer.render(this.stage);
};

module.exports = Renderer;
