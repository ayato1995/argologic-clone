var Copy = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, "copy", x, y);
		this.image = core.assets["../img/copy.png"];
	},

	register_eventListener: function(player, array, frame, stage) {
		this.addEventListener("touchstart", function() {
			if (player.copy_list.length != 0) {
				for (var i = 0; i < player.copy_list.length; i++) {
					console.log("test");
					var block = player.copy_list[i].set_block(array, frame, stage, player);
				}
			}
		});
	},
});