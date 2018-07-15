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
    this.initialize_blocks();
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
    this.func_d = [];
    this.arg_d = [];
    this.func_d_arg = [];
    */
    this.copy_list = [];
    this.maxCopy = 3;
    this.befor_block = null
  },

  initialize_blocks: function() {
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
    this.func_d = new Func_d(330, 130);
    this.func_d.register_move_eventListener();
    this.arg1 = new Arg(330, 150, 0);
    this.arg1.register_move_eventListener();
    this.arg2 = new Arg(330, 170, 1);
    this.arg2.register_move_eventListener();
    this.arg3 = new Arg(330, 190, 2);
    this.arg3.register_move_eventListener();
    this.loop_start = new Loop_start(330, 210);
    this.loop_start.register_move_eventListener();
    this.loop_end = new Loop_end(330, 230);
    this.loop_end.register_move_eventListener();
  },

  push_block_stage: function(stage) {
    stage.addChild(this);
    stage.addChild(this.up);
    stage.addChild(this.left_rotate);
    stage.addChild(this.right_rotate);
    stage.addChild(this.func_h);
    stage.addChild(this.func_c);
    stage.addChild(this.func_s);
    stage.addChild(this.func_d);
    stage.addChild(this.arg1);
    stage.addChild(this.arg2);
    stage.addChild(this.arg3);
    stage.addChild(this.loop_start);
    stage.addChild(this.loop_start.loop_label);
    stage.addChild(this.loop_end);
  },

  set_block_eventListener: function(frames, stage, player) {
    this.up.register_all_set_eventListener(frames, stage, player);
    this.left_rotate.register_all_set_eventListener(frames, stage, player);
    this.right_rotate.register_all_set_eventListener(frames, stage, player);
    this.func_h.register_all_set_eventListener(frames, stage, player);
    this.func_c.register_all_set_eventListener(frames, stage, player);
    this.func_s.register_all_set_eventListener(frames, stage, player);
    this.func_d.register_all_set_eventListener(frames, stage, player);
    this.arg1.register_all_set_eventListener(frames, stage, player);
    this.arg2.register_all_set_eventListener(frames, stage, player);
    this.arg3.register_all_set_eventListener(frames, stage, player);
    this.loop_start.register_all_set_eventListener(frames, stage, player);
    this.loop_end.register_all_set_eventListener(frames, stage, player);
  },

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
  }
})
