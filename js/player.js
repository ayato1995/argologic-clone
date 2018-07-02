var Player = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, direction) {
    enchant.Sprite.call(this, 32, 32);
    this.image = core.assets["../img/chara5.png"];
    var dire = 1;
    if (direction == "up") dire = 28;
    else if (direction == "down") dire = 1;
    else if (direction == "left") dire = 10;
    else if (direction == "right") dire = 19;
    this.frame = dire;
    this.x = x;
    this.y = y;
    this.up = new Block(330, 10, "up");
    this.leftRotate = new Block(330, 30, "leftRotate");
    this.rightRotate = new Block(330, 50, "rightRotate");
    this.func = new Block(330, 70, "function");
    this.forStart = new Block(330, 90, "forStart");
    this.forEnd = new Block(330, 110, "forEnd");
    this.func_h = [];
    this.func_c = [];
    this.func_s = [];
    this.func_D = [];
    this.copy_list = [];
    this.maxCopy = 3;
  },

  toUp: function(core, map) {
  	switch(this.frame) {
  	case 1:
  		this.moveDown(core, map);
  		break;
  	case 10:
  		this.moveLeft(core, map);
  		break;
  	case 19:
  		this.moveRight(core, map);
  		break;
  	case 28:
  		this.moveUp(core, map);
  		break;
  	}
  },

  moveUp: function(core, map) {
  	var y = this.y;
    while (y - this.y < 16) {
      this.y -= 4;
    }
    this.decisionMap(map, core, this.x + 8, this.y - 3);
  },

  moveDown: function(core, map) {
  	var y = this.y;
  	while(this.y - y < 16) {
  		this.y += 4;
  	}
  	this.decisionMap(map, core, this.x + 8, this.y + 8);
  },

  moveLeft: function(core, map) {
  	var x = this.x;
  	while (x - this.x < 16) {
  		this.x -= 4;
  	}
  	this.decisionMap(map, core, this.x + 8, this.y);
  },

  moveRight: function(core, map) {
  	var x = this.x;
  	while(this.x - x < 16) {
  		this.x += 4;
  	}
  	this.decisionMap(map, core, this.x + 20, this.y);
  },

  decisionMap: function(map, core, x, y) {
    //console.log("x " + x + " y " + y);
  	if (map.hitTest(x, y)) {
  		core.rootScene.removeChild(this);
  		core.replaceScene(core.field(false));
      //console.log("x " + x + " y " + y);
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

  copyListSize: function() {
    if (this.copy_list.lenght < maxCopy) {
      return true;
    }
    return false;
  }

})
