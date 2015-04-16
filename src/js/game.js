'use strict';

var PIXI = require('pixi.js');
var World = require('./world');
var Renderer = require('./renderer');
var Component = require('./component');
var NoteSequence = require('./models/note_sequence');
var MusicalScoreGraphics = require('./graphics/musical_score_graphics');
var FingerPositionGraphics = require('./graphics/finger_position_graphics');
var NoteNameGraphics = require('./graphics/note_name_graphics');

var Game = function() {

  this.world = new World();
  this.renderer = new Renderer(500, 300);
  this.sequenceTimer;

  this.components = [];

  this.update();

};

Game.prototype.start = function start() {
  var noteSequence = new NoteSequence({world: this.world});

  var musicalScoreGraphics = new MusicalScoreGraphics({world: this.world, model: noteSequence});

  var musicalScoreComponent = new Component(
    noteSequence,
    musicalScoreGraphics
  );

  this.addComponent(musicalScoreComponent);

  var fingerPositionGraphics = new FingerPositionGraphics({world: this.world, model: noteSequence});

  var fingerPositionComponent = new Component(
    noteSequence,
    fingerPositionGraphics
  );

  this.addComponent(fingerPositionComponent);

  var noteNameGraphics = new NoteNameGraphics({world: this.world, model: noteSequence});

  var noteNameComponent = new Component(
    noteSequence,
    noteNameGraphics
  );

  this.addComponent(noteNameComponent);

  this.world.start();
};

Game.prototype.addComponent = function addComponent(component) {
  component.setup(this.renderer);
  this.components.push(component);
};

Game.prototype.stop = function stop() {
  this.world.stop();
};

Game.prototype.update = function update() {
  for(var i = 0; i < this.components.length; i = i + 1) {
    this.components[i].update(this.renderer);
  }

  this.renderer.render();
  requestAnimationFrame(this.update.bind(this));
};

module.exports = Game;
