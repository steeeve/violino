'use strict';

var PIXI = require('pixi.js');

var NoteNameGraphics = function(options) {
  var _options = options || {};
  this.model = _options.model;
  this.world = _options.world;

  this.world.on('reflect', this.onReflect, this);
  this.world.on('attempt', this.onAttempt, this);
};

NoteNameGraphics.prototype.onReflect = function onReflect() {
  this.draw();
};

NoteNameGraphics.prototype.onAttempt = function onReflect() {
  this.remove();
};

NoteNameGraphics.prototype.draw = function draw() {
  var stage = this.renderer.stage;
  var graphic = new PIXI.Text(this.text(), {font: '35px Helvetica', fill: '#000000'});
  this.graphic = graphic;
  this.graphic.x = 150;
  this.graphic.y = 20;
  stage.addChild(this.graphic);
};

NoteNameGraphics.prototype.text = function text() {
  return this.model.current().note.replace(/\d/gi, '');
};

NoteNameGraphics.prototype.remove = function remove() {
  var stage = this.renderer.stage;
  stage.removeChild(this.graphic);
};

NoteNameGraphics.prototype.setup = function setup(renderer) {
  this.renderer = renderer;
};

NoteNameGraphics.prototype.update = function update() {
};

module.exports = NoteNameGraphics;
