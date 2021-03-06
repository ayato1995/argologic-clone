﻿var Player = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, direction) {
    enchant.Sprite.call(this, 32, 32);
    this.image = core.assets["../img/chara5.png"];
    this.frame = this.set_frame(direction);
    this.x = x;
    this.y = y;
    this.initialize_blocks();
    this.block_list = [];
    this.copy_list = [];
    this.maxCopy = 3;
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

  pop_block_stage: function(stage) {
  	stage.removeChild(this.up);
  	stage.removeChild(this.left_rotate);
  	stage.removeChild(this.right_rotate);
  	stage.removeChild(this.func_h);
  	stage.removeChild(this.func_c);
  	stage.removeChild(this.func_s);
  	stage.removeChild(this.func_d);
  	stage.removeChild(this.arg1);
  	stage.removeChild(this.arg2);
  	stage.removeChild(this.arg3);
  	stage.removeChild(this.loop_start);
  	stage.removeChild(this.loop_start.loop_label);
  	stage.removeChild(this.loop_end);
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

  set_frame: function(direction) {
  	var dire = 1;
  	if (direction == "up") dire = 28;
    else if (direction == "down") dire = 1;
    else if (direction == "left") dire = 10;
    else if (direction == "right") dire = 19;
    return dire;
  },

  toUp: function(stage) {
  	switch(this.frame) {
  	case 1:
  		this.moveDown(stage);
  		break;
  	case 10:
  		this.moveLeft(stage);
  		break;
  	case 19:
  		this.moveRight(stage);
  		break;
  	case 28:
  		this.moveUp(stage);
  		break;
  	}
  },

  moveUp: function(stage) {
  	var y = this.y;
    while (y - this.y < 16) {
      this.y -= 4;
    }
    this.decisionMap(stage, this.x + 16, this.y + 16);
  },

  moveDown: function(stage) {
  	var y = this.y;
  	while(this.y - y < 16) {
  		this.y += 4;
  	}
  	this.decisionMap(stage, this.x + 16, this.y + 16);
  },

  moveLeft: function(stage) {
  	var x = this.x;
  	while (x - this.x < 16) {
  		this.x -= 4;
  	}
  	this.decisionMap(stage, this.x + 16, this.y + 16);
  },

  moveRight: function(stage) {
  	var x = this.x;
  	while(this.x - x < 16) {
  		this.x += 4;
  	}
  	this.decisionMap(stage, this.x + 16, this.y + 16);
  },

  decisionMap: function(stage, x, y) {
    var map = stage.map;
  	if (map.hitTest(x, y)) {
  	  this.opacity = 0;
      stage.clearFlag = false;
  	  core.field(false, stage);
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
});
