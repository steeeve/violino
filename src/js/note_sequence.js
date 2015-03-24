var Note = require('./note');

var NoteSequence = function(options) {
  var _options = options || {};
  this.notesAhead = _options.notesAhead;
  this.notes = {
    next: [],
    current: null,
    history: []
  };
};

NoteSequence.prototype.generateNotesAhead = function generateNotesAhead() {
  while(this.notes.next.length < this.notesAhead) {
    this.notes.next.push(Note.random());
  }
};

NoteSequence.prototype.next = function next() {
  this.generateNotesAhead();
  if (this.notes.current) {
    this.notes.history.push(this.notes.current);
  }
  this.notes.current = this.notes.next.shift();
  this.notes.next = this.notes.next.slice(-this.notesAhead);
};

module.exports = NoteSequence;
