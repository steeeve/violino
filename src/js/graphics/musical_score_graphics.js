'use strict';

var PIXI = require('pixi.js');
var _ = require('lodash');

var lines = 5;
var distance = 10;

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

MusicalScoreGraphics.prototype.drawScore = function drawScore(renderer) {
  if(!this.musicalScore) {
    var musicalScore = new PIXI.Graphics();
    musicalScore.lineStyle(3, 0x000000, 1);
    musicalScore.moveTo(0, 0);
    musicalScore.lineTo(0, distance * (lines - 1));
    musicalScore.moveTo(300, 0);
    musicalScore.lineTo(300, distance * (lines - 1));

    for(var i = 0; i < 5; i = i + 1) {
      var y = i * distance;
      musicalScore.moveTo(0, y);
      musicalScore.lineTo(300, y);
    }

    this.musicalScore = musicalScore;
    renderer.addChild(musicalScore);
  }
};

MusicalScoreGraphics.prototype.update = function update(renderer) {
  _.each(this.notes, function(note) {
    renderer.removeChild(note);
  });
//   this.notes = [];
//   this.notes.push(createNote(this.musicalScore.current()));
//   this.notes.push(createNote(this.musicalScore.previous()));
//   this.notes.push(createNote(this.musicalScore.next()));
};
//
// function createNote(note) {
//   var container = new PIXI.Graphics();
//   var ellipse = new PIXI.Graphics();
//   ellipse.beginFill(0x000000, 1);
//   ellipse.drawEllipse(-4, -3, 8, 6);
//   ellipse.endFill();
//   ellipse.rotation = -0.4;
//   var line = new PIXI.Graphics();
//   line.lineStyle(3, 0x000000, 1);
//   line.moveTo(1, -3);
//   line.lineTo(1, -40);
//   container.addChild(ellipse);
//   container.addChild(line);
//   return container;
// }

module.exports = MusicalScoreGraphics;
