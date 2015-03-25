'use strict';

var Backbone = require('backbone');
var _ = require('lodash');

var World = function() {
  this.notesAhead = 5;
  this.timeToAttempt = 2000;  // in msecs
  this.timeToReflect = 2000;  // in msecs
  this.continue = false;
};

_.extend(World.prototype, Backbone.Events);

World.prototype.start = function start() {
    this.continue = true;
};

World.prototype.stop = function stop() {
  this.continue = false;
};


module.exports = World;
