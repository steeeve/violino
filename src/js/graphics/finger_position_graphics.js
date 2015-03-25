'use strict';

var PIXI = require('pixi.js');

var FINGER_POSITIONS = [
  'E 3rd',
  'E 2nd',
  'E 1st',
  'Open E', // OPEN
  'A 3rd',
  'A 2nd',
  'A 1st',
  'Open A', // OPEN
  'D 3rd',
  'D 2nd',
  'D 1st',
  'Open D', // OPEN
  'G 3rd',
  'G 2nd',
  'G 1st',
  'Open G'  // OPEN
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
  var graphic = new PIXI.Text(this.text(), {font: '35px Helvetica', fill: '#000000'});
  this.graphic = graphic;
  this.graphic.x = 250;
  this.graphic.y = 10;
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
