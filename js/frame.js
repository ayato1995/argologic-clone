var Frame = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, name) {
		enchant.Sprite.call(this, 32, 200);
		this.x = x;
		this.y = y;
		this.name = name;
		this.backgroundColor = this.set_backgroundColor(name);
	},

	set_backgroundColor: function(name) {
		if (name == "stack") 
			return "gray";
		return "lightsteelblue";
	}
})