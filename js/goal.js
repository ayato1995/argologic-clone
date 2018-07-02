
var Goal = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, img) {
    enchant.Sprite.call(this, 16, 16);
    this.image = img;
    this.x = x;
    this.y = y;  
  }
})