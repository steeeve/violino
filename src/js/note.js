var POSSIBLE_NOTES = [
  'C1',
  'B1',
  'B1#'
];

var Note = function(note) {
  this.note = note;
};

Note.random = function random() {
  var randomNote = POSSIBLE_NOTES[Math.floor(Math.random() * POSSIBLE_NOTES.length)];
  return new Note(randomNote);
};

module.exports = Note;
