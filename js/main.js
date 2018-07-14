enchant();

window.onload = function() {
  var selectFlag = false;
  core = new Core(600, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif", "../img/goal.png", "../img/clear.png",
               "../img/end.png", "../img/up.png", "../img/left.png", "../img/right.png",
               "../img/loop_start.png", "../img/loop_end.png",
               "../img/heart.png", "../img/spade.png", "../img/diamond.png", "../img/clover.png",
               "../img/copy.png", "../img/cut.png", "../img/play.png");

  core.onload = function() {
    var stage = titleScene();

    core.pushScene(stage);
  }

  core.field = function(clear, stage) {
    var scene = new Scene();
    var game_set_image = new Sprite(189, 97);
    if (clear && stage.clearFlag) {
      stage.clearFlag = false;
      game_set_image = core.assets["../img/clear.png"];
    } else {
      stage.clearFlag = false;
      game_set_image = core.assets["../img/end.png"];
    }
    core.register_replay_eventListener(game_set_image, stage.id, clear);
    scene.addChild(game_set_image);
    return scene;
  }

  core.register_replay_eventListener = function(img, id, flag) {
  	img.addEventListener("touchstart", function() {
  	  core.popScene();
  	  core.popScene();
  	  var scene = null;
  	  if (flag)
  	    scene = titleScene();
  	  else 
  	    scene = createStage(id);
  	  core.pushScene(scene);
  	});
  }

  core.start();
  // core.debug();
};
