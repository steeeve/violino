'use strict';

var PIXI = require('pixi.js');
var _ = require('lodash');

var xOffset = 100;
var yOffset = 100;
var scoreLineDistance = 12;
var scoreWidth = 300;
var scoreColor = 0x909090;
var noteColor = 0x000000;

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
    musicalScore.lineStyle(2, scoreColor, 1);
    musicalScore.moveTo(xOffset, yOffset);
    musicalScore.lineTo(xOffset, yOffset + scoreLineDistance * (lines - 1));
    musicalScore.moveTo(xOffset + scoreWidth, yOffset);
    musicalScore.lineTo(xOffset+ scoreWidth, yOffset+ scoreLineDistance * (lines - 1));

    musicalScore.lineStyle(1, scoreColor, 1);

    for(var i = 0; i < 5; i = i + 1) {
      var y = i * scoreLineDistance;
      musicalScore.moveTo(xOffset, yOffset + y);
      musicalScore.lineTo(xOffset + scoreWidth, yOffset + y);
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
  this.notes.push(createNoteGraphic(this.model.current()));
  this.notes = _.compact(this.notes);
  _.each(this.notes, function(note) {
    stage.addChild(note);
  });
};

function createNoteGraphic(model) {
  if(model) {

    var graphic = new PIXI.Graphics();
    var note = new PIXI.Graphics();
    note.beginFill(noteColor, 1);
    note.drawEllipse(-4, -3, 8, 6);
    note.endFill();
    note.rotation = -0.4;
    var tail = new PIXI.Graphics();
    tail.lineStyle(2, noteColor, 1);
    tail.moveTo(2, -3);
    tail.lineTo(2, -40);
    graphic.addChild(note);
    graphic.addChild(tail);

    // var i;

    if(model.noteIndex() === 12) {
      addBar(graphic, 1);
    }

    if(model.noteIndex() === 13) {
      addBar(graphic, 1 - scoreLineDistance * 0.5);
    }

    if(model.noteIndex() === 14) {
      addBar(graphic, 1 - scoreLineDistance);
      addBar(graphic, 1);
    }

    if(model.noteIndex() === 15) {
      addBar(graphic, 1 - scoreLineDistance * 1.5);
      addBar(graphic, 1 - scoreLineDistance * 0.5);
    }

    if(model.noteIndex() === 0) {
      addBar(graphic, 1);
    }

    var notePosition = calculateNotePosition(model.noteIndex());
    graphic.x = notePosition.x;
    graphic.y = notePosition.y;

    return graphic;
  }
}

function calculateNotePosition(noteIndex) {
  return {
    x: xOffset + scoreWidth * 0.5,
    y: yOffset + (noteIndex - 2) * scoreLineDistance * 0.5 + 2
  };
}

function addBar(graphic, offset) {
  var bar = new PIXI.Graphics();
  bar.lineStyle(1, noteColor, 1);
  bar.moveTo(-20, offset  - 3);
  bar.lineTo(10, offset - 3);
  graphic.addChild(bar);
}

module.exports = MusicalScoreGraphics;
