
var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, type) {
    enchant.Sprite.call(this, 60, 10);
    this.type = type;
    label = new Label(this.type);
    this.x = x;
    this.y = y;

    if (type == "up") {
      color = "red";
    } else if (type == "down") {
      color = "blue";
    } else if (type == "left") {
      color = "green";
    } else if (type == "right") {
      color = "yellow";
    }

    this.backgroundColor = color;
    //this.rootScene.addChild(label);
  },

  remove: function(core) {
    core.rootScene.removeChild(this);
  }
});
