'use strict';

var PIXI = require('pixi.js');

var FINGER_POSITIONS = [
  [4, 2.25],
  [4, 2],
  [4, 1],
  [4, 0], // OPEN
  [3, 2.25],
  [3, 2],
  [3, 1],
  [3, 0], // OPEN
  [2, 2.25],
  [2, 2],
  [2, 1],
  [2, 0], // OPEN
  [1, 2.25],
  [1, 2],
  [1, 1],
  [1, 0] // OPEN
];

var topBorder = 3;
var verticalLineDistance = 26;
var horizontalLineDistance = 20;
var fingerSize = 4.5;

var stringColor = 0x404040;
var fingeringColor = 0x000000;
var markerColor = 0xA0A0A0;

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
  var graphic = new PIXI.Graphics();
  var i = 0;

  graphic.lineStyle(2, markerColor, 1);

  for(i = 1; i < 3; i = i + 1) {
    graphic.moveTo(0, i * verticalLineDistance + topBorder);
    graphic.lineTo(horizontalLineDistance * 3, i * verticalLineDistance + topBorder);
  }

  graphic.lineStyle(2, stringColor, 1);
  graphic.moveTo(0, 0);
  graphic.lineTo(horizontalLineDistance * 3, 0);
  graphic.moveTo(0, topBorder);
  graphic.lineTo(horizontalLineDistance * 3, topBorder);

  for(i = 0; i < 2; i = i + 1) {
    graphic.moveTo(0, 0);
    graphic.lineTo(horizontalLineDistance * 3, 0);
  }

  for(i = 0; i < 4; i = i + 1) {
    graphic.moveTo(horizontalLineDistance * i, 0);
    graphic.lineTo(horizontalLineDistance * i, verticalLineDistance * 3 + topBorder);
  }

  var coords = this.fingerPositionCoords();
  graphic.lineStyle(2, fingeringColor, 1);

  if(this.fingerPosition()[1] !== 0) {
    graphic.beginFill(fingeringColor);
  } else {
    graphic.beginFill(0xFFFFFF);
  }

  graphic.drawCircle(coords.x, coords.y, fingerSize);
  graphic.endFill();

  this.graphic = graphic;

  this.graphic.x = 300;
  this.graphic.y = 8;
  stage.addChild(this.graphic);
};

FingerPositionGraphics.prototype.fingerPosition = function fingerPosition() {
  return FINGER_POSITIONS[this.model.current().noteIndex()];
};

FingerPositionGraphics.prototype.fingerPositionCoords = function fingerPositionCoords() {
  var position = this.fingerPosition();
  return {
    x: (position[0] - 1) * horizontalLineDistance,
    y: (position[1]) * verticalLineDistance + topBorder
  };
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
