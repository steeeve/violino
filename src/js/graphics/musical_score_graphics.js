'use strict';

var PIXI = require('pixi.js');
var _ = require('lodash');

var xOffset = 20;
var yOffset = 20;
var distance = 12;
var notes = [
  'G3', // open
  'A4',
  'B4',
  'C4',
  'D4', // open
  'E4',
  'F4#',
  'G4',
  'A5', // open
  'B5',
  'C5#',
  'D5',
  'E5', // open
  'F5#',
  'G5#',
  'A5'
];

var MusicalScoreGraphics = function(options) {
  var _options = options || {};
  this.model = _options.model;
  this.world = _options.world;
};

MusicalScoreGraphics.prototype.remove = function remove(renderer) {
  if(this.musicalScore) {
    renderer.removeChild(this.musicalScore);
  }
};

MusicalScoreGraphics.prototype.setup = function setup(renderer) {
  if(!this.musicalScore) {
    var stage = renderer.stage;
    var lines = 5;
    var musicalScore = new PIXI.Graphics();
    musicalScore.lineStyle(3, 0x909090, 1);
    musicalScore.moveTo(xOffset, yOffset);
    musicalScore.lineTo(xOffset, yOffset + distance * (lines - 1));
    musicalScore.moveTo(xOffset + 300, yOffset);
    musicalScore.lineTo(xOffset+ 300, yOffset+ distance * (lines - 1));

    for(var i = 0; i < 5; i = i + 1) {
      var y = i * distance;
      musicalScore.moveTo(xOffset + 0, yOffset + y);
      musicalScore.lineTo(xOffset + 300, yOffset + y);
    }

    this.musicalScore = musicalScore;
    stage.addChild(musicalScore);
  }
};

MusicalScoreGraphics.prototype.update = function update(renderer) {
  var stage = renderer.stage;
  _.each(this.notes, function(note) {
    stage.removeChild(note);
  });
  this.notes = [];
  this.notes.push(createNote(this.model.current()));
  this.notes = _.compact(this.notes);
  _.each(this.notes, function(note) {
    stage.addChild(note);
  });
};

function createNote(note) {
  if(note) {
    var container = new PIXI.Graphics();
    container.x = xOffset + 100;
    container.y = yOffset + 67 - notes.indexOf(note.note) * distance * 0.5;
    var ellipse = new PIXI.Graphics();
    ellipse.beginFill(0x000000, 1);
    ellipse.drawEllipse(-4, -3, 8, 6);
    ellipse.endFill();
    ellipse.rotation = -0.4;
    var line = new PIXI.Graphics();
    line.lineStyle(3, 0x000000, 1);
    line.moveTo(1, -3);
    line.lineTo(1, -40);
    container.addChild(ellipse);
    container.addChild(line);

    // if(note.isOutsideOfScore()) {
    //   var cross = new PIXI.Graphics();
    //   cross.lineStyle(3, 0x000000, 1);
    //   cross.moveTo(-20, -1);
    //   cross.lineTo(10, -1);
    //   container.addChild(cross);
    // }

    return container;
  }
}

module.exports = MusicalScoreGraphics;
