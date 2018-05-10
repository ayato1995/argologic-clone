
var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, type) {
    enchant.Sprite.call(this, 60, 10);
    label = new Label(type);
    this.x = x;
    this.y = y;
    this.backgroundColor = "red";
    //this.rootScene.addChild(label);
  },

  remove: function(core) {
    core.rootScene.removeChild(this);
  }
});
