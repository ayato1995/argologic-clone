﻿var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y) {
    enchant.Sprite.call(this, 16, 16);
    this.x = x;
    this.y = y;
    this.select = false;
    this.default_x = x;
    this.default_y = y;
    this.arg_frag = false;
  },

  register_all_set_eventListener: function(frames, stage, player) {
    for (var i = 0; i < frames.length; i++) {
      this.register_set_eventListener(frames[i].blocks, frames[i], stage, player);
    }
  },

  register_new_block_eventListener: function(array, frame, stage, player) {
    this.register_select_eventListener(array, frame, stage, player);
    this.register_all_remove_eventListener(array, frame, stage, player);
    this.register_move_eventListener();
  },

  register_all_remove_eventListener: function(array, frame, stage, player) {
    for (var i = 0; i < stage.frames.length; i++) {
      if (frame == stage.frames[i]) continue;
      this.register_move_insert_eventListener(stage.frames[i].blocks, stage.frames[i], stage, player);
    }
    this.register_remove_eventListener(array, frame, stage, player);
  },

  register_select_eventListener: function(array, frame, stage, player) {
    this.addEventListener("touchend", function() {
      if (stage.play_flag) return;
      if (!stage.selectFlag) return;
      if (this.select) {
        var i = this.searchBlock(player.copy_list);
        player.copy_list.splice(i, player.copy_list.length - i);
        i = this.searchBlock(array);
        for (var j = i; j < array.length && j < i + 3; j++) {
          array[j].select = false;
          array[j].backgroundColor = array[j].default_color;
        }
      } else {
        this.reset_block_color(stage.frames);
        player.copy_list.length = 0;
        var i = this.searchBlock(array);
        for (var j = i; j < array.length && j < i + 3; j++) {
          player.copy_list.push(array[j]);
          array[j].select = true;
          array[j].backgroundColor = "yellow";
        }
      }
    });
  },

  register_move_insert_eventListener: function(array, frame, stage, player) {
    this.addEventListener("touchend", function(e) {
      if (stage.play_flag) return;
      if (stage.selectFlag) return;
      if (e.x > frame.x && e.x < frame.x + frame.width
          && e.y > frame.y && e.y < frame.y + frame.height) {
        stage.log += "insert " + this.type + " " + frame.name + "\n";
        var b = this.set_block(array, frame, stage, player);
        if (frame.nest.length != 0) {
          b.arg_frag = true;
          b.scale(1 - (frame.nest.length) * 0.1, 1 - (frame.nest.length) * 0.1);
          var kind = frame.nest.pop();
          kind--;
          if (kind != 0)
            frame.nest.push(kind);
        }
      }
    });
  },

  register_remove_eventListener: function(array, frame, stage, player) {
    this.addEventListener("touchend", function(e) {
      if (e.x > frame.x && e.x < frame.x + frame.width
          && e.y > frame.y && e.y < frame.y + frame.height) {
        this.x = this.default_x;
        this.y = this.default_y;
      } else {
        if (this.arg_frag) {
          if (frame.nest.length != 0) {
            frame.nest[frame.nest.length - 1]++;
          } else {
            frame.nest.push(1);
          }
        }
        stage.log += "delete " + this.type + " " + frame.name + "\n";
        stage.removeChild(this);
        this.block_remove(array);
      }
    });
  },

  register_move_eventListener: function() {
    this.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });
  },

  register_set_eventListener: function(array, frame, stage, player) {
    this.addEventListener("touchend", function(e) {
      if (e.x > frame.x && e.x < frame.x + frame.width
          && e.y > frame.y && e.y < frame.y + frame.height) {
        stage.log += "insert " + this.type + " " + frame.name + "\n";
        var b = this.set_block(array, frame, stage, player);
        if (frame.nest.length != 0) {
          b.arg_frag = true;
          b.scale(1 - (frame.nest.length) * 0.1, 1 - (frame.nest.length) * 0.1);
          var kind = frame.nest.pop();
          kind--;
          if (kind != 0)
            frame.nest.push(kind);
        }
      }
      this.x = this.default_x;
      this.y = this.default_y;
    });
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
    if (i == -1) return false;
    array.splice(i, 1);
    for (var i = 0; i < array.length; i++) {
      array[i].moveBlock(i);
    }
    return true;
  },

  reset_block_color: function(frames) {
    for (var i = 0; i < frames.length; i++) {
      frames[i].reset_blocks_backgroundColor();
    }
  },

  search_func_block: function(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i].type == "function")
        return i;
    }
    return -1;
  },

  reset_scale: function(array, num) {
    var i = this.searchBlock(array);
    if (i == -1) return false;
    for (var j = i + 1; j < i + num + 1 && j < array.length; j++) {
      array[j].scaleX += 0.1;
      array[j].scaleY += 0.1;
      array[j].arg_frag = false;
    }
    return true;
  },

  output_log: function() {
    return this.type + "\n";
  },

  move_frame_block: function(frame, i) {
    this.x = frame.x + 4;
    this.y = frame.y + 4 + i * 20;
  },

  remove_stage_block: function(stage) {
    stage.removeChild(this);
  }

});
