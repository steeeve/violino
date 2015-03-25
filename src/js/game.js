'use strict';

var PIXI = require('pixi.js');
var World = require('./world');
var Renderer = require('./renderer');
var NoteSequence = require('./models/note_sequence');
var MusicalScoreGraphics = require('./graphics/musical_score_graphics');

var Game = function() {

  this.world = new World();
  this.renderer = new Renderer();
  this.sequenceTimer;

  this.components = [];

  this.update();

};

Game.prototype.play = function play() {
  var noteSequence = new NoteSequence({world: this.world});
  var musicalScoreGraphics = new MusicalScoreGraphics({world: this.world, model: noteSequence});
  var musicalScoreComponent = new Component(
    NoteSequence,
    MusicalScoreGraphics
  );

  this.world.start();
  console.log('START');
};

Game.prototype.stop = function stop() {
  this.world.stop();
  console.log('STOP');
};

Game.prototype.reflect = function reflect() {
  this.world.dispatch('reflect');

  if(this.world.continue) {
    clearTimeout(this.sequenceTimer);
    this.sequenceTimer = setTimeout(this.attempt.bind(this), this.world.timeToReflect);
  }
};

Game.prototype.attempt = function attempt() {
  this.world.dispatch('advance');

  clearTimeout(this.sequenceTimer);
  this.sequenceTimer = setTimeout(this.reflect.bind(this), this.world.timeToAttempt);
};

Game.prototype.update = function update() {
  for(var i in this.components) {
    components.update(this.renderer.stage);
  }
  this.renderer.render();
  requestAnimFrame(this.update.bind(this));
}

module.exports = Game;
