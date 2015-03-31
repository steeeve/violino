'use strict';

var Note = require('./note');
var _ = require('lodash');
var Backbone = require('backbone');

var NoteSequence = function(options) {
  var _options = options || {};
  this.world = _options.world;
  this.notes = {
    next: [],
    current: null,
    history: []
  };

  this.world.on('attempt', function() { this.advance(); }, this);
};

_.extend(NoteSequence.prototype, Backbone.Events);

NoteSequence.prototype.generateNotesAhead = function generateNotesAhead() {
  while(this.notes.next.length < this.world.notesAhead) {
    this.notes.next.push(Note.random());
  }
};

NoteSequence.prototype.next = function next() {
  return this.notes.next[0];
};

NoteSequence.prototype.previous = function previous() {
  return this.notes.history[this.notes.history.length - 1];
};

NoteSequence.prototype.current = function current() {
  return this.notes.current;
};

NoteSequence.prototype.shift = function shift() {
  if (this.notes.current) {
    this.notes.history.push(this.notes.current);
  }
  this.notes.current = this.notes.next.shift();
  this.notes.next = this.notes.next.slice(-this.notesAhead);
};

NoteSequence.prototype.advance = function advance() {
  this.generateNotesAhead();
  this.shift();
  console.log('CURRENT NOTE:', this.current().note);
};

NoteSequence.prototype.update = function update() {};
NoteSequence.prototype.setup = function setup() {};
NoteSequence.prototype.remove = function remove() {};

module.exports = NoteSequence;
