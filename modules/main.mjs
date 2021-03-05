import { Game } from '/modules/core/Game.mjs';
import { DemoScene } from '/modules/demo/DemoScene.mjs';

let start = 0;
let canvas = document.createElement("canvas")
let game = new Game("ufo");
game.add(new DemoScene(game))
game.run();
requestAnimationFrame(step);

function step(timestamp) {
  var progress;
  if (start === null) start = timestamp;
  progress = timestamp - start;
  game.update(progress)
  requestAnimationFrame(step);
}
