'use strict';

var POSSIBLE_NOTES = [
  'A6',
  'G5#',
  'F5#',
  'E5', // OPEN
  'D5',
  'C5#',
  'B5',
  'A5', // OPEN
  'G4',
  'F4#',
  'E4',
  'D4', // OPEN
  'C4',
  'B4',
  'A4',
  'G3'  // OPEN
];

var RANDOM_NOTES = [
  'A6',
  'G5#',
  'F5#',
  'E5', // OPEN
  'D5',
  'C5#',
  'B5',
  'A5', // OPEN
  'G4',
  'F4#',
  'E4',
  'D4', // OPEN
  'C4',
  'B4',
  'A4',
  'G3'  // OPEN
];

var Note = function(note) {
  this.note = note;
  this.POSSIBLE_NOTES = POSSIBLE_NOTES;
};

Note.random = function random() {
  var randomNote = RANDOM_NOTES[Math.floor(Math.random() * RANDOM_NOTES.length)];
  return new Note(randomNote);
};

Note.prototype.isOutsideOfScore = function isOutsideOfScore() {
  return this.noteIndex() < 4 || this.noteIndex() > 11;
};

Note.prototype.isSharp = function isSharp() {
  return false;
};

Note.prototype.noteIndex = function noteIndex() {
  return this.POSSIBLE_NOTES.indexOf(this.note);
};

module.exports = Note;
