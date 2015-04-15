'use strict';

var PIXI = require('pixi.js');

var FINGER_POSITIONS = [
  [4, 5],
  [4, 4],
  [4, 2],
  [4, 0], // OPEN
  [3, 5],
  [3, 4],
  [3, 2],
  [3, 0], // OPEN
  [2, 5],
  [2, 4],
  [2, 2],
  [2, 0], // OPEN
  [1, 5],
  [1, 4],
  [1, 2],
  [1, 0] // OPEN
];

var topBorder = 3;
var verticalLineDistance = 12;
var horizontalLineDistance = 20;
var fingerSize = 5;
var verticalLines = 5;

var stringColor = 0x1E191F;
var markerColor = 0xA0A0A0;
var activeColor = 0xCB4137;

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

  // Draw markers
  for(i = 1; i <= verticalLines; i = i + 1) {
    graphic.moveTo(0, i * verticalLineDistance + topBorder);
    graphic.lineTo(horizontalLineDistance * 3, i * verticalLineDistance + topBorder);
  }

  graphic.lineStyle(2, stringColor, 1);
  graphic.moveTo(0, 0);
  graphic.lineTo(horizontalLineDistance * 3, 0);
  graphic.moveTo(0, topBorder);
  graphic.lineTo(horizontalLineDistance * 3, topBorder);

  // Draw strings
  for(i = 0; i < 4; i = i + 1) {
    graphic.moveTo(horizontalLineDistance * i, 0);
    graphic.lineTo(horizontalLineDistance * i, verticalLineDistance * (1 + verticalLines) + topBorder);
  }

  // Draw positioning
  var coords = this.fingerPositionCoords();
  graphic.lineStyle(2, activeColor, 1);
  graphic.moveTo(horizontalLineDistance * (this.fingerPosition()[0] - 1), 0);
  graphic.lineTo(horizontalLineDistance * (this.fingerPosition()[0] - 1), verticalLineDistance * (verticalLines + 1) + topBorder);

  if(this.fingerPosition()[1] !== 0) {
    graphic.beginFill(activeColor);
    graphic.drawCircle(coords.x, coords.y, fingerSize);
    graphic.endFill();
  }

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
