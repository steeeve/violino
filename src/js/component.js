'use strict';

var Component = function(model, graphics) {
  this.model = model;
  this.graphics = graphics;
};

Component.prototype.update = function update(renderer) {
  this.model.update();
  this.graphics.update(renderer);
};

module.exports = Component;
