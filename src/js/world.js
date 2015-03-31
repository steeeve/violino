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
    this.attempt();
};

World.prototype.stop = function stop() {
  this.continue = false;
};

World.prototype.reflect = function reflect() {
  this.trigger('reflect');

  if(this.continue) {
    clearTimeout(this.sequenceTimer);
    this.sequenceTimer = setTimeout(this.attempt.bind(this), this.timeToReflect);
  }
};

World.prototype.attempt = function attempt() {
  this.trigger('attempt');

  clearTimeout(this.sequenceTimer);
  this.sequenceTimer = setTimeout(this.reflect.bind(this), this.timeToAttempt);
};


module.exports = World;
