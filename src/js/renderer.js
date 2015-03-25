'use strict';

var PIXI = require('pixi.js');

var Renderer = function() {
  this.setup();
};

Renderer.prototype.setup = function setup() {
  this.stage = new PIXI.Stage(0xFFFFFF, true);
  this.renderer = PIXI.autoDetectRenderer(800, 600, null, false, true);
  this.renderer.view.style.display = "block";
  document.body.appendChild(this.renderer.view);
};

Renderer.prototype.render = function render() {
  this.renderer.render(this.stage);
};

module.exports = Renderer;
