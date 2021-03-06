class Scene {
  constructor(g) {
    this.game = g;
    this.objects = [];
    this.activeNumber = 0;
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.cameras = new Map();
    this.camera = {};
  }

  add(o) {
    this.objects.push(o);
    this.objects.sort((o1, o2) => {
      return o1.layer > o2.layer ? 1 : -1;
    });
    this.game.render.add(o);
  }

  init() {}

  addCamera(camera) {
    this.cameras.set(camera.name, camera);
    if (this.camera == undefined) {
      this.setCamera(camera.name);
    }
  }

  setCamera(camName) {
    var c = this.cameras.get(camName);
    this.camera = c;
    this.game.render.setCamera(this.camera);
  }

  clearAllObjects() {
    tis.game.render.clearAllObjects();
    this.objects = [];
    this.activeNumber = 0;
  }

  keyPressed(e) {
    switch (e.keyCode) {
      case 37:
        this.keys.left = true;
        break;
      case 38:
        this.keys.up = true;
        break;
      case 39:
        this.keys.right = true;
        break;
      case 40:
        this.keys.down = true;
        break;
      default:
        break;
    }
  }

  keyReleased(e) {
    switch (e.keyCode) {
      case 37:
        this.keys.left = false;
        break;
      case 38:
        this.keys.up = false;
        break;
      case 39:
        this.keys.right = false;
        break;
      case 40:
        this.keys.down = false;
        break;

      case 82:
        this.reset(this.game);
        break;
      default:
        break;
    }
  }

  reset(g) {}

  input() {
    if (this.game.gamepadAPI.gamepads[0]) {
      var gamepad = this.game.gamepadAPI.gamepads[0];
      this.keys.left = gamepad.buttons[14].pressed;
      this.keys.right = gamepad.buttons[15].pressed;
      this.keys.up = gamepad.buttons[12].pressed;
      this.keys.down = gamepad.buttons[13].pressed;
    }
  }

  update(elapsed) {
    this.activeNumber = 0;
    this.objects.forEach((o) => {
      if (o.active) {
        this.activeNumber++;
      }
    });
    if (this.camera) {
      this.camera.update(elapsed);
    }
  }

  draw(render, elapsed, startTime) {
    render.draw(elapsed, startTime);
  }

  drawPause(render) {
    var c = render.ctx;

    c.font = "24pt sans-serif";
    var pauseStr = "PAUSE";
    var psize = c.measureText(pauseStr);
    var y = (2 * render.canvas.height) / 5;

    c.fillStyle = "black";
    c.fillRect(-10, y + 4, render.canvas.width + 20, -32);
    c.fillStyle = "white";
    c.shadowColor = "rgba(0.2,0.2,0.2,0.6)";
    c.shadowBlur = 4;
    c.shadowOffsetX = 2;
    c.shadowOffsetY = 2;
    c.fillText(pauseStr, (render.canvas.width - psize.width) / 2, y);
    c.shadowBlur = 0;
  }

  drawHUD(render) {}
}

export { Scene };
