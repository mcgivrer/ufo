import { Render } from "./render.mjs";
import { PhysicEngine } from "./math/physicengine.mjs";
import { Collider } from "./collider.mjs";

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.gamepads = {};
    this.buttonsOldState = {};

    window.addEventListener("keydown", this.keyPressed.bind(this), false);
    window.addEventListener("keyup", this.keyReleased.bind(this), false);
    window.addEventListener("resize", this.resizeCanvas.bind(this), false);

    // experimental
    window.addEventListener(
      "gamepadconnected",
      this.gamepadHandlerConnected.bind(this),
      false
    );
    window.addEventListener(
      "gamepaddisconnected",
      this.gamepadHandlerDisconnected.bind(this),
      false
    );

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
  gamepadHandlerConnected(e) {
    var gamepad = e.gamepad;
    console.log("✅ 🎮 A gamepad was connected:", e.gamepad);
    this.gamepads[gamepad.index] = gamepad;
  }
  gamepadHandlerDisconnected(e) {
    var gamepad = e.gamepad;
    console.log("❌ 🎮 A gamepad was disconnected:", e.gamepad);
    delete this.gamepads[gamepad.index];
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

  update(elapsed) {
    this.frameTime = elapsed - this.lastTime;
    this.handleGamepads(this);
    if (this.scene) {
      // Update Objects from the scene.
      if (!this.pause) {
        this.scene.input();
        this.physic.update(this.scene, this.frameTime);
      }
      // Draw all objects of the scene.
      this.scene.draw(this.render, this.frameTime, elapsed);
    }
    this.lastTime = elapsed;
  }

  handleGamepads(game) {
    const gamepads = navigator.getGamepads();

    for (const gamepad of gamepads) {
      // Disregard empty slots.
      if (!gamepad) {
        continue;
      }
      gamepad.buttons.forEach((v, k) => {
        var s = v.pressed;
        if (s && !game.buttonsOldState[k]) {
          v.index=k
          this.gamepadButtonPressed(v);
        } else if (
          !s &&
          game.buttonsOldState[k] !== undefined &&
          game.buttonsOldState[k]
        ) {
          v.index=k
          this.gamepadButtonReleased(v);
        }
        game.buttonsOldState[k] = v.pressed;
      });
    }
  }

  gamepadButtonPressed(button){
    this.scene.gamepadButtonPressed(button)
    console.log("btn:" + button.index + "=" + "pressed");
    
  }
  gamepadButtonReleased(button){
    this.scene.gamepadButtonReleased(button)
    console.log("btn:" + button.index + "=" + "released");    
  }

  run() {
    this.init();
    this.update();
  }
}

export { Game };
