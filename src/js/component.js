'use strict';

var Component = function(model, graphics) {
  this.model = model;
  this.graphics = graphics;
};

Component.prototype.update = function update(renderer) {
  this.model.update();
  this.graphics.update(renderer);
};

Component.prototype.setup = function setup(renderer) {
  this.model.setup();
  this.graphics.setup(renderer);
};

Component.prototype.remove = function remove(renderer) {
  this.model.remove();
  this.graphics.remove(renderer);
};

module.exports = Component;
