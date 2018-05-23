
var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, type) {
    enchant.Sprite.call(this, 60, 10);
    this.type = type;
    label = new Label(this.type);
    this.x = x;
    this.y = y;

    if (type == "up") {
      color = "red";
    } else if (type == "left") {
      color = "green";
    } else if (type == "right") {
      color = "yellow";
    } else if (type == "for") {
      color = "blue";
    } else if (type == "if") {
      color = "orange";
    } else if (type == "function") {
      color = "chartreuse green";
    }

    this.backgroundColor = color;
    //this.rootScene.addChild(label);
  },

  remove: function(core) {
    core.rootScene.removeChild(this);
  },

  execution: function(block, player) {
    for (var b in block) {
      switch (b.type) {
        case "up":
          player.up();
          break;
        case "left":
          player.left();
          break;
        case "right":
          player.right();
          break;
      }
    }
  },

  moveBlock: function(n) {
    this.x = 405;
    this.y = n * 15 + 15;
  }
});
