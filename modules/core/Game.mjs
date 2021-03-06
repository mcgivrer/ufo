import { Render } from "/modules/core/Render.mjs";
import { PhysicEngine } from "/modules/core/math/PhysicEngine.mjs";
import { Collider } from "/modules/core/Collider.mjs";
import {GamepadAPI} from '/modules/core/input/GamepadAPI.mjs'

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.gamepads = {};
    this.attributes = {
      weatherKey:"none"
    };

    window.addEventListener("keydown", this.keyPressed.bind(this), false);
    window.addEventListener("keyup", this.keyReleased.bind(this), false);
    window.addEventListener("resize", this.resizeCanvas.bind(this), false);
    this.gamepadAPI = new GamepadAPI(this);

    this.scenes = [];
    this.scene = null;
    this.debug = 2;
    this.pause = false;

    this.stageConfig = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.canvas.width = this.stageConfig.width;
    this.canvas.height = this.stageConfig.height;

    this.render = new Render(this, this.canvas);
    this.physic = new PhysicEngine(this);
    this.collider = new Collider(this);
    this.lastTime = 0;
  }

  init() {
    this.scene.init(this);
  }

  add(scene) {
    this.scenes.push(scene);
    if (this.scenes.length == 1) {
      this.scene = this.scenes[0];
    }
  }

  resizeCanvas() {
    this.stageConfig = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.render.resize(this.stageConfig);
    this.update();
  }

  keyPressed(e) {
    this.scene.keyPressed(e);
  }

  keyReleased(e) {
    var code = e.keyCode;
    switch (code) {
      case 68:
        this.debug = this.debug == 6 ? (this.debug = 0) : this.debug + 1;
        break;
      case 80:
      case 19:
        this.pause = !this.pause;
        break;
      default:
        console.log("event key released code:" + code + " key:" + e.key);
        break;
    }
    this.scene.keyReleased(e);
  }
  gamepadPressed(b){
    console.log(b)
  }
  gamepadReleased(b){
    console.log(b)
  }

  update(elapsed) {
    this.frameTime = elapsed - this.lastTime;

    if (this.scene) {
      // Update Objects from the scene.
      if (!this.pause) {
        this.gamepadAPI.handleGamepads(this)
        this.scene.input();
        this.physic.update(this.scene, this.frameTime);
        this.scene.update(elapsed);
      }
      // Draw all objects of the scene.
      this.scene.draw(this.render, this.frameTime, elapsed);
    }
    this.lastTime = elapsed;
  }

  run() {
    this.init();
    this.update();
  }
}

export { Game };
