var Player = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, map) {
    enchant.Sprite.call(this, 32, 32);
    this.image = core.assets["../img/chara5.png"];
    this.frame = 28;
    this.x = x;
    this.y = y;
    this.up = new Block(330, 10, "up");
    this.left = new Block(330, 25, "left");
    this.right = new Block(330, 40, "right");
    this.leftRotate = new Block(330, 55, "leftRotate");
    this.rightRotate = new Block(330, 70, "rightRotate");
  },

  toUp: function(core, map) {
    var y = this.y;
    while (y - this.y < 16) {
      this.y -= 4;
      if (map.hitTest(this.x + 8, this.y - 3)) {
        this.y += 4;
        break;
      }
    }
  },

  toDown: function(core, map) {
    var y = this.y;
    while (this.y - y < 16) {
      this.y += 4;
      if (map.hitTest(this.x + 8, this.y + 8)) {
        this.y -= 4;
        break;
      }
    }
  },

  toLeft: function(core, map) {
    var x = this.x;
    while (x - this.x < 16) {
      this.x -= 4;
      if (map.hitTest(this.x + 8, this.y)) {
        this.x += 4;
        break;
      }
    }
  },

  toRight: function(core, map) {
    var x = this.x;
    while (this.x - x < 16) {
      this.x += 4;
      if (map.hitTest(this.x + 20, this.y)) {
        this.x -= 4;
        break;
      }
    }
  },

  toRightRotate: function() {
  	switch(this.frame) {
  	case 1:
  	  this.frame = 10;
  	  break;
  	case 10:
  	  this.frame = 28;
  	  break;
  	case 19:
  	  this.frame = 1;
  	  break;
  	case 28:
  	  this.frame = 19
  	  break;
  	}
  },

  toLeftRotate: function() {
  	switch(this.frame) {
  	case 1:
  	  this.frame = 19;
  	  break;
  	case 10:
  	  this.frame = 1;
  	  break;
  	case 19:
  	  this.frame = 28;
  	  break;
  	case 28:
  	  this.frame = 10;
  	  break;
  	}
  },

})