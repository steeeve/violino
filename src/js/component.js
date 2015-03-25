'use strict';

var Component = function(model, graphics) {
  this.model = model;
  this.graphics = graphics;
};

Component.prototype.update = function update(stage) {
  model.update();
  graphics.update(stage);
};

module.exports = Component;
