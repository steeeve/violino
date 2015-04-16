'use strict';

var PIXI = require('pixi.js');

var NoteGraphic = function() {
  var graphic = new PIXI.Graphics();
  var note = new PIXI.Text('♩', {font: '50px Helvetica', fill: '#000000'});
  note.x = -26;
  note.y = -43;
  graphic.addChild(note);

  return graphic;
};

module.exports = NoteGraphic;
