import {Game} from './game.mjs';


let game = new Game("canvas","2d");
game.run();

function step(timestamp) {
  var progress;
  if (start === null) start = timestamp;
  progress = timestamp - start;
  d.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    requestAnimationFrame(step);
  }
}