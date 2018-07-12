var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y) {
    enchant.Sprite.call(this, 16, 16);
    this.x = x;
    this.y = y;
    this.select = false;
    this.default_x = x;
    this.default_y = y;
  },

  remove: function() {
    core.rootScene.removeChild(this);
  },

  moveBlock: function(n) {
    this.y = n * 20 + 31 + 4;
  },

  checkForStart: function(block_list) {
  	for (var i = 0; i < block_list.length; i++) {
  	  if (block_list[i].type == "forStart") return true;
  	}
  	return false;
  },

  checkArg1: function(block_list) {
  	for (var i = 0; i < block_list.length; i++) {
  	  if (block_list[i].type == "arg1") return true;
  	}
  	return false;
  },

  checkArg2: function(block_list) {
  	for (var i = 0; i < block_list.length; i++) {
  	  if (block_list[i].type == "arg2") return true;
  	}
  	return false;
  },

  expandFuncBlock: function(argNum) {
  	var blocks = [];
  	switch(argNum) {
  	case 1:
  	  blocks.push(new Block(this.x, this.y + this.height, "arg1"));
  	  this.register_expand_func_block_eventListener(blocks[0], this);
  	  blocks[0].height += 6;
      break;
  	case 2:
  	  blocks.push(new Block(this.x, this.y + this.height, "arg1"));
  	  this.register_expand_func_block_eventListener(blocks[0], this);
  	  blocks[0].height += 6;
  	  blocks.push(new Block(blocks[0].x, blocks[0].y + blocks[0].height, "arg2"));
  	  this.register_expand_func_block_eventListener(blocks[1], blocks[0]);
  	  blocks[1].height += 4;
  	  break;
  	case 3:
  	  blocks.push(new Block(this.x, this.y + this.height, "arg1"));
  	  this.register_expand_func_block_eventListener(blocks[0], this);
  	  blocks[0].height += 6;
  	  blocks.push(new Block(blocks[0].x, blocks[0].y + blocks[0].height, "arg2"));
  	  this.register_expand_func_block_eventListener(blocks[1], blocks[0]);
  	  blocks[1].height += 4;
  	  blocks.push(new Block(blocks[1].x, blocks[1].y + blocks[1].height, "arg3"));
  	  this.register_expand_func_block_eventListener(blocks[2], blocks[1]);
  	  blocks[2].height += 4;
  	}

    return blocks;
  },

  register_expand_func_block_eventListener: function(arg, block) {
  	arg.addEventListener("enterframe", function() {
  	  this.x = block.x;
  	  this.y = block.y + block.height;
  	});
  },

  searchBlock: function(array) {
      for (var i = 0; i < array.length; i++)
        if (array[i] == this) return i;
      return -1;
  },

  block_remove: function(array) {
    var i = this.searchBlock(array);
    array.splice(i, 1);
    for (var i = 0; i < array.length; i++) {
      array[i].moveBlock(i);
    }
  }
});
