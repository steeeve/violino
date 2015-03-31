'use strict';

var PIXI = require('pixi.js');
var World = require('./world');
var Renderer = require('./renderer');
var Component = require('./component');
var NoteSequence = require('./models/note_sequence');
var MusicalScoreGraphics = require('./graphics/musical_score_graphics');

var Game = function() {

  this.world = new World();
  this.renderer = new Renderer();
  this.sequenceTimer;

  this.components = [];

  this.update();

};

Game.prototype.start = function start() {
  console.log('START');

  var noteSequence = new NoteSequence({world: this.world});
  var musicalScoreGraphics = new MusicalScoreGraphics({world: this.world, model: noteSequence});
  var musicalScoreComponent = new Component(
    noteSequence,
    musicalScoreGraphics
  );
  this.addComponent(musicalScoreComponent);

  this.world.start();
};

Game.prototype.addComponent = function addComponent(component) {
  component.setup(this.renderer);
  this.components.push(component);
};

Game.prototype.stop = function stop() {
  console.log('STOP');

  this.world.stop();
};

Game.prototype.update = function update() {
  for(var i = 0; i < this.components.length; i++ ) {
    this.components[i].update(this.renderer);
  }

  this.renderer.render();
  requestAnimFrame(this.update.bind(this));
}

module.exports = Game;
