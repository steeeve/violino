'use strict';

var PIXI = require('pixi.js');
var _ = require('lodash');
var NoteGraphic = require('./note_graphic');

var xOffset = 5;
var yOffset = 40;
var scoreLineDistance = 5;
var scoreWidth = 90;
var scoreColor = 0x404040;
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

    musicalScore.moveTo(0, 0);

    musicalScore.lineTo(
      0,
      renderer.scaleY(scoreLineDistance * (lines - 1))
    );

    musicalScore.moveTo(
      renderer.scaleX(scoreWidth),
      0
    );

    musicalScore.lineTo(
      renderer.scaleX(scoreWidth),
      renderer.scaleY(scoreLineDistance * (lines - 1))
    );

    musicalScore.lineStyle(1, scoreColor, 1);

    for(var i = 0; i < 5; i = i + 1) {
      var y = i * scoreLineDistance;
      musicalScore.moveTo(
        0,
        renderer.scaleY(y)
      );
      musicalScore.lineTo(
        renderer.scaleX(scoreWidth),
        renderer.scaleY(y)
      );
    }

    musicalScore.x = renderer.scaleX(xOffset);
    musicalScore.y = renderer.scaleY(yOffset);

    this.musicalScore = musicalScore;
    stage.addChild(musicalScore);
  }
};

MusicalScoreGraphics.prototype.update = function update(renderer) {
  var stage = this.musicalScore;
  _.each(this.notes, function(note) {
    stage.removeChild(note);
  });

  this.notes = [];

  if(this.model.current()) {
    this.notes.push(createNoteGraphic(renderer, this.model.current()));
  }

  _.each(this.notes, function(note) {
    stage.addChild(note);
  });

};

function createNoteGraphic(renderer, model) {

  var graphic = NoteGraphic(renderer);

  if(model.noteIndex() >= 12) {
    addBar(
      renderer,
      graphic,
      12 - model.noteIndex()
    );
  }

  if(model.noteIndex() >= 14) {
    addBar(
      renderer,
      graphic,
      14 - model.noteIndex()
    );
  }

  if(model.noteIndex() === 0) {
    addBar(
      renderer,
      graphic,
      0
    );
  }

  if(model.note.search(/#/) !== -1) {
    var text = new PIXI.Text('#', {font: '16px Helvetica', fill: '#000000'});
    text.x = -22;
    text.y = -14;
    graphic.addChild(text);
  }

  graphic.x = renderer.scaleX(scoreWidth * 0.5);
  graphic.y = renderer.scaleY(notePosition(model.noteIndex()));

  return graphic;

}

function notePosition(noteIndex) {
  return (noteIndex - 2) * scoreLineDistance * 0.5;
}

function addBar(renderer, graphic, offset) {
  var bar = new PIXI.Graphics();
  bar.lineStyle(1, noteColor, 1);
  var y = renderer.scaleY(offset * scoreLineDistance * 0.5);
  bar.moveTo(-20, y);
  bar.lineTo(10, y);
  graphic.addChild(bar);
}

module.exports = MusicalScoreGraphics;
