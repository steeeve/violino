'use strict';

var PIXI = require('pixi.js');

var FINGER_POSITIONS = [
  'E (3)',
  'E (2)',
  'E (1)',
  'E (open)', // OPEN
  'A (3)',
  'A (2)',
  'A (1)',
  'A (open)', // OPEN
  'D (3)',
  'D [2]',
  'D [1]',
  'D [open]', // OPEN
  'G [3]',
  'G [2]',
  'G [1]',
  'G [open]'  // OPEN
];


var FingerPositionGraphics = function(options) {
  var _options = options || {};
  this.model = _options.model;
  this.world = _options.world;

  this.world.on('reflect', this.onReflect, this);
  this.world.on('attempt', this.onAttempt, this);
};

FingerPositionGraphics.prototype.onReflect = function onReflect() {
  this.draw();
};

FingerPositionGraphics.prototype.onAttempt = function onReflect() {
  this.remove();
};

FingerPositionGraphics.prototype.draw = function draw() {
  var stage = this.renderer.stage;
  var graphic = new PIXI.Text(this.text(), {font: '20px Helvetica', fill: '#000000'});
  this.graphic = graphic;
  this.graphic.x = 280;
  this.graphic.y = 20;
  stage.addChild(this.graphic);
};

FingerPositionGraphics.prototype.text = function text() {
  return FINGER_POSITIONS[this.model.current().noteIndex()];
};

FingerPositionGraphics.prototype.remove = function remove() {
  var stage = this.renderer.stage;
  stage.removeChild(this.graphic);
};

FingerPositionGraphics.prototype.setup = function setup(renderer) {
  this.renderer = renderer;
};

FingerPositionGraphics.prototype.update = function update() {
};

module.exports = FingerPositionGraphics;
