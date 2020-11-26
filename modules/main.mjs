import {Game} from './game.mjs';

let start=0;

let game = new Game("ufo");

game.run();
requestAnimationFrame(step);


function step(timestamp) {
  var progress;
  if (start === null) start = timestamp;
  progress = timestamp - start;
  game.update(progress)
  requestAnimationFrame(step);
}
