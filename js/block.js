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

  reset_backgroundColor: function() {
    this.backgroundColor = this.default_color;
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
  },

  reset_block_color: function(frames) {
    frames[0].reset_blocks_backgroundColor();
    frames[1].reset_blocks_backgroundColor();
    frames[2].reset_blocks_backgroundColor();
    frames[3].reset_blocks_backgroundColor();
    frames[4].reset_blocks_backgroundColor();
  },

  search_func_block: function(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i].type == "function")
        return i;
    }
    return -1;
  },

  reset_scale: function(array, i, num) {
    console.log(i + " " + num);
    for (var j = i + 1; j < i + num + 1 && j < array.length; j++) {
      console.log(j);
      array[j].scaleX += 0.1;
      array[j].scaleY += 0.1;
    }
  },

  output_log: function() {
    return this.type + "\n";
  },

});
