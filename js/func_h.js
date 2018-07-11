var Func_h = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "heart";
		this.image = core.assets["../img/heart.png"];
		this.func = [];
		this.arg = [];
		this.arg_num = 0;
	}
});