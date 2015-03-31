'use strict';

var POSSIBLE_NOTES = [
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

var Note = function(note) {
  this.note = note;
};

Note.random = function random() {
  var randomNote = POSSIBLE_NOTES[Math.floor(Math.random() * POSSIBLE_NOTES.length)];
  return new Note(randomNote);
};

Note.prototype.isOutsideOfScore = function isOutsideOfScore() {
  return POSSIBLE_NOTES.indexOf(this.note) < 3 || POSSIBLE_NOTES.indexOf(this.note) > 12;
};

Note.prototype.isSharp = function isSharp() {
  return false;
};

module.exports = Note;
