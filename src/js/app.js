var NoteSequence = require('./note_sequence');

var game = new Phaser.Game(900, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var notesAhead = 5;
var timeToAttempt = 500;  // in msecs
var timeToReflect = 500;  // in msecs
var noteSequence;
var sequenceTimer;
var play;

function preload() {
}

function create() {
  game.stage.backgroundColor = '#ffffff';
  start();
}

function update() {
}

function start() {
  noteSequence = new NoteSequence({notesAhead: notesAhead});
  play = true;
  attempt();
}

function stop() {
  play = false;
}

function reflect() {
  if(play) {
    clearTimeout(sequenceTimer);
    sequenceTimer = setTimeout(attempt, timeToReflect);
  }
}

function attempt() {
  noteSequence.next({generateNotesAhead: 5});
  console.log(noteSequence.notes.current.note);

  clearTimeout(sequenceTimer);
  sequenceTimer = setTimeout(reflect, timeToAttempt);
}
