import {Game} from './core/game.mjs';
import { DemoScene } from './scene/demoscene.mjs';

let start=0;

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
