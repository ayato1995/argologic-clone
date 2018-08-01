titleScene = function() {
  var scene = new Scene();
  core.height = 320;
  var title = new Label("アルゴロジック クローン");
  title.height = 16;
  title.width = 166;
  title.x = (core.width / 2) - (title.width / 2);
  title.y = 40;
  var stage1 = new Label("stage 1");
  stage1.height = 16;
  stage1.width = 112;
  stage1.x = (core.width / 4) - (stage1.width / 2);
  stage1.y = core.height / 2;
  var stage2 = new Label("stage 2");
  stage2.height = 16;
  stage2.width = 112;
  stage2.x = (core.width * 3 / 4) - (stage2.width / 2);
  stage2.y = core.height / 2;
  var stage3 = new Label("stage 3");
  stage3.height = 16;
  stage3.width = 112;
  stage3.x = (core.width / 4) - (stage3.width / 2);
  stage3.y = stage1.y + 30;
  var stage4 = new Label("stage 4");
  stage4.height = 16;
  stage4.width = 112;
  stage4.x = (core.width * 3/ 4) - (stage4.width /2);
  stage4.y = stage2.y + 30;

  stage1.addEventListener("touchstart", function() {
  	var stage = createStage(1);
  	core.popScene();
  	core.pushScene(stage);
  });

  stage2.addEventListener("touchstart", function() {
    var stage = createStage(2);
    core.popScene();
    core.pushScene(stage);
  });

  stage3.addEventListener("touchstart", function() {
    var stage = createStage(3);
    core.popScene();
    core.pushScene(stage);
  });

  stage4.addEventListener("touchstart", function() {
    var stage = createStage(4);
    core.popScene();
    core.pushScene(stage);
  });

  scene.addChild(title);
  scene.addChild(stage1);
  scene.addChild(stage2);
  scene.addChild(stage3);
  scene.addChild(stage4);

  return scene;
}