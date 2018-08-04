titleScene = function() {
  var scene = new Scene();
  core.height = 320;
  var title = new Label("アルゴロジック クローン");
  title.height = 16;
  title.width = 166;
  title.x = (core.width / 2) - (title.width / 2);
  title.y = 40;
 
  var stage1 = new Title_label(core.height / 2, 1, "stage 1");
  var stage2 = new Title_label(core.height / 2, 2, "sgate 2");
  var stage3 = new Title_label(stage1.y + 30, 3, "stage 3");
  var stage4 = new Title_label(stage2.y + 30, 4, "stage 4");
  var stage5 = new Title_label(stage3.y + 30, 5, "stage 5");
  var stage6 = new Title_label(stage4.y + 30, 6, "stage 6");

  scene.addChild(title);
  scene.addChild(stage1);
  scene.addChild(stage2);
  scene.addChild(stage3);
  scene.addChild(stage4);
  scene.addChild(stage5);
  scene.addChild(stage6);

  return scene;
}