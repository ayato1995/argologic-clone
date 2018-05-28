﻿
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
    } else if (type == "leftRotate") {
      color = "aquamarine";
    } else if (type == "rightRotate") {
      color = "gold";
    } else if (type == "for") {
      color = "blue";
    } else if (type == "if") {
      color = "orange";
    } else if (type == "function") {
      color = "chartreuse green";
    } else if (type == "play") {
      color = "darkturquoise";
    }

    this.backgroundColor = color;
    //this.rootScene.addChild(label);
  },

  remove: function(core) {
    core.rootScene.removeChild(this);
  },

  execution: function(block, player, core, backgroundMap) {
    for (i = 0; i < block.length; i++) {
      switch (block[i].type) {
        case "up":
          player.toUp(core, backgroundMap);
          break;
        case "left":
          player.toLeft(core, backgroundMap);
          break;
        case "right":
          player.toRight(core, backgroundMap);
          break;
        case "leftRotate":
          player.toLeftRotate(core, backgroundMap);
          break;
        case "rightRotate":
          player.toRightRotate(core, backgroundMap);
          break;
      }
      block[i].remove(core);
    }
  },

  moveBlock: function(n) {
    this.x = 405;
    this.y = n * 15 + 15;
  }
});
