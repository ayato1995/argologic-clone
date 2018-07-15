titleScene = function() {
  var scene = new Scene();
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

  stage1.addEventListener("touchstart", function() {
  	var stage = createStage(1);
  	core.popScene();
  	core.pushScene(stage);
  });

  stage2.addEventListener("touchstart", function() {
    var stage = createStage(2);
    core.popScene();
    core.pushScene(stage);
  })

  scene.addChild(title);
  scene.addChild(stage1);
  scene.addChild(stage2);

  return scene;
}