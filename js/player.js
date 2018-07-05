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
    this.funch = new Block(330, 70, "function_h");
    this.funcc = new Block(330, 90, "function_c");
    this.funcs = new Block(330, 110, "function_s");
    this.funcd = new Block(330, 130, "function_d");
    this.arg1 = new Block(330, 150, "arg1");
    this.arg2 = new Block(330, 170, "arg2");
    this.arg3 = new Block(330, 190, "arg3");
    this.forStart = new Block(330, 210, "forStart");
    this.forEnd = new Block(330, 230, "forEnd");
    this.func_h = [];
    this.arg_h = [];
    this.func_h_arg = [];
    this.func_c = [];
    this.arg_c = [];
    this.func_c_arg = [];
    this.func_s = [];
    this.arg_s = [];
    this.func_s_arg = [];
    this.func_d = [];
    this.arg_d = [];
    this.func_d_arg = [];
    this.copy_list = [];
    this.maxCopy = 3;
  },

  toUp: function(map) {
  	switch(this.frame) {
  	case 1:
  		this.moveDown(map);
  		break;
  	case 10:
  		this.moveLeft(map);
  		break;
  	case 19:
  		this.moveRight(map);
  		break;
  	case 28:
  		this.moveUp(map);
  		break;
  	}
  },

  moveUp: function(map) {
  	var y = this.y;
    while (y - this.y < 16) {
      this.y -= 4;
    }
    this.decisionMap(map,this.x + 16, this.y + 16);
  },

  moveDown: function(map) {
  	var y = this.y;
  	while(this.y - y < 16) {
  		this.y += 4;
  	}
  	this.decisionMap(map,this.x + 16, this.y + 16);
  },

  moveLeft: function(map) {
  	var x = this.x;
  	while (x - this.x < 16) {
  		this.x -= 4;
  	}
  	this.decisionMap(map, this.x + 16, this.y + 16);
  },

  moveRight: function(map) {
  	var x = this.x;
  	while(this.x - x < 16) {
  		this.x += 4;
  	}
  	this.decisionMap(map, this.x + 16, this.y + 16);
  },

  decisionMap: function(map, x, y) {
  	if (map.hitTest(x, y)) {
  		core.rootScene.removeChild(this);
  		core.pushScene(core.field(false, core.rootScene.id));
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
  },

  arg_check: function(array, type) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == type) {
        return;
      }
    }
    array.push(type);
  }
})
