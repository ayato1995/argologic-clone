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
    this.blocks = [];
    this.up = new Up(330, 10);
    this.up.register_move_eventListener();
    this.left_rotate = new Left_rotate(330, 30);
    this.left_rotate.register_move_eventListener();
    this.right_rotate = new Right_rotate(330, 50);
    this.right_rotate.register_move_eventListener();
    this.func_h = new Func_h(330, 70);
    this.func_h.register_move_eventListener();
    this.func_c = new Func_c(330, 90);
    this.func_c.register_move_eventListener();
    this.func_s = new Func_s(330, 110);
    this.func_s.register_move_eventListener();
    this.funcd = new Block(330, 130, "function_d");
    this.arg1 = new Block(330, 150, "arg1");
    this.arg2 = new Block(330, 170, "arg2");
    this.arg3 = new Block(330, 190, "arg3");
    this.forStart = new Block(330, 210, "forStart");
    this.forEnd = new Block(330, 230, "forEnd");
    this.block_list = [];
    /*
    this.func_h = [];
    // blockを入れる
    this.arg_h = [];
    // 引数が何個あったか入れる
    this.func_h_arg = [];
    this.func_c = [];
    this.arg_c = [];
    this.func_c_arg = [];
    this.func_s = [];
    this.arg_s = [];
    this.func_s_arg = [];
    */
    this.func_d = [];
    this.arg_d = [];
    this.func_d_arg = [];
    this.copy_list = [];
    this.maxCopy = 3;
    this.befor_block = null
  },
  /*
  initialize_blocks: function() {
    this.blocks.push(new Up(330, 10));
    this.blocks.push(new Left_rotate(330, 30));
    this.blocks.push(new Right_rotate(330, 50));
    this.blocks.push(new Func_h(330, 70));
    this.blocks.push(new Func_c(330, 90));
    this.blocks.push(new Func_s(330, 110));
    this.blocks.push(new Func_d(330, 130));
    this.blocks.push(new Arg1(330, 150));
    this.blocks.push(new Arg2(330, 170));
    this.blocks.push(new Arg3(330, 190));
  },
  */

  toUp: function(map, stage) {
  	switch(this.frame) {
  	case 1:
  		this.moveDown(map, stage);
  		break;
  	case 10:
  		this.moveLeft(map, stage);
  		break;
  	case 19:
  		this.moveRight(map, stage);
  		break;
  	case 28:
  		this.moveUp(map, stage);
  		break;
  	}
  },

  moveUp: function(map, stage) {
  	var y = this.y;
    while (y - this.y < 16) {
      this.y -= 4;
    }
    this.decisionMap(map, stage, this.x + 16, this.y + 16);
  },

  moveDown: function(map, stage) {
  	var y = this.y;
  	while(this.y - y < 16) {
  		this.y += 4;
  	}
  	this.decisionMap(map, stage,this.x + 16, this.y + 16);
  },

  moveLeft: function(map, stage) {
  	var x = this.x;
  	while (x - this.x < 16) {
  		this.x -= 4;
  	}
  	this.decisionMap(map, stage, this.x + 16, this.y + 16);
  },

  moveRight: function(map, stage) {
  	var x = this.x;
  	while(this.x - x < 16) {
  		this.x += 4;
  	}
  	this.decisionMap(map, stage, this.x + 16, this.y + 16);
  },

  decisionMap: function(map, stage, x, y) {
  	if (map.hitTest(x, y)) {
  		stage.removeChild(this);
  		core.pushScene(core.field(false, core.rootScene));
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
    if (this.copy_list.lenght < maxCopy)
      return true;
    return false;
  },

  arg_check: function(array, type) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == type) {
        return;
      }
    }
    array.push(type);
  },

  reset_blocks_color: function() {
    this.reset_block_color(this.block_list);
    this.reset_block_color(this.func_h);
    this.reset_block_color(this.func_c);
    this.reset_block_color(this.func_s);
    this.reset_block_color(this.func_d);
  }
})
