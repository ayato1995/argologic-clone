
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

  play: function(block, player, core, backgroundMap, goal) {
    var time;
    for (i = 0; i < block.length; i++) {
      time = i * 1000;
      setTimeout(this.execution, time, block[i], player, core, backgroundMap);
    }
    setTimeout(function() {
      if (player.intersect(goal)) {
        core.replaceScene(core.field(true));
      } else {
        core.replaceScene(core.field(false));
      }
    }, i * 1000);
  },

  execution: function(block, player, core, backgroundMap) {
    switch(block.type) {
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
    block.remove(core);
  },

  moveBlock: function(n) {
    this.x = 405;
    this.y = n * 15 + 15;
  }
});
