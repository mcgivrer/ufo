import { Scene } from "/modules/core/Scene.mjs";
import { GO_NODURATION } from "/modules/core/GameObject.mjs";
import { Camera } from "/modules/core/Camera.mjs";

import { Ball } from "/modules/demo/entity/Ball.mjs";
import { Player } from "/modules/demo/entity/Player.mjs";

const zeroPad = (num, places) => String(num).padStart(places, "0");

class DemoScene extends Scene {
  constructor(g) {
    super(g);
    this.numberObjects = 20;
    this.index = 0;

    this.properties = {
      score: 0,
      maxLives: 5,
      lives: 5,
      coins: 0,
      mushrooms: 2,
    };
    this.player = {};
  }

  init(game) {
    this.objects = [];
    this.game.render.clearAllObjects();
    this.generateBatch(game, "enemy_", 20, true);
    this.player = new Player(
      "player",
      game.stageConfig.width / 2,
      game.stageConfig.height / 2
    );
    this.add(this.player);
    this.addCamera(
      new Camera("cam01", 0.002, this.player, { width: 2000, height: 1000 })
    );
    this.setCamera("cam01");
  }

  generateBatch(game, name = "entity_", number = 10, create = false) {
    this.numberObjects += number;
    for (let i = 0; i < number; i++) {
      this.generate(game, name + this.index++);
    }
  }

  randomGO(game, go) {
    var ps = Math.random() * 32;
    // position
    var px = ps + Math.random() * game.stageConfig.width;
    var py = ps + Math.random() * game.stageConfig.height;
    // velocity
    var dx = Math.random() * 10 - 5;
    var dy = Math.random() * 10 - 5;
    // color
    var pc =
      "rgb(" +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      "," +
      "255)";

    go.position.x = px;
    go.position.y = py;
    go.velocity.x = dx;
    go.velocity.y = dy;
    go.size.width = ps;
    go.size.height = ps;

    go.color = pc;
    go.properties.elasticity = Math.random() * 0.9 + 0.1;
    go.properties.friction = Math.random() * 0.95 + 0.05;
    go.properties.mass = Math.random() * 0.8 + 0.5;
    go.duration = GO_NODURATION;
    //Math.random() * 10000 + 2000;
  }

  generate(game, name, go) {
    // size
    var o = go;
    if (!o) {
      o = new Ball(name);
    }
    this.randomGO(game, o);
    this.add(o);
  }

  keyPressed(e) {
    super.keyPressed(e);
  }

  keyReleased(e) {
    super.keyReleased(e);
    switch (e.keyCode) {
      case 34:
        this.removeGameObject(10, "player");
        break;
      case 33:
        this.generateBatch(this.game, "enemy_", 10);
        break;
      case 8:
        this.clearGameObjects("player");
        break;
      case 71:
        this.game.physic.properties.gravity.y = -this.game.physic.properties
          .gravity.y;
    }
  }

  randomAll(game, excludes) {
    this.objects.forEach((go) => {
      if (!excludes.includes(go.name)) {
        this.randomGO(game, go);
      }
    });
  }

  reset(g) {
    this.randomAll(g, "player");
  }

  clearGameObjects(excludes) {
    for (var i = 0; i < this.objects.length; i++) {
      var o = this.objects[i];
      if (!excludes.includes(o.name)) {
        this.objects.splice(i, 1);
        i--;
      }
    }
  }

  removeGameObject(nb, excludes) {
    for (let i = 0; i < nb; i++) {
      if (i >= 0 && i < this.objects.length) {
        var o = this.objects[i];
        if (excludes && !excludes.includes(o.name)) {
          this.objects.splice(i, 1);
          i++;
          this.game.render.remove(o);
        }
      }
    }
  }

  input() {
    super.input();
    var acc = this.player.properties.dacc;
    if (this.keys.left) {
      this.player.forces.push({
        x: -acc.x,
        y: 0,
      });
    }
    if (this.keys.up) {
      this.player.forces.push({
        x: 0,
        y: -acc.y,
      });
    }
    if (this.keys.right) {
      this.player.forces.push({
        x: acc.x,
        y: 0,
      });
    }
    if (this.keys.down) {
      this.player.forces.push({
        x: 0,
        y: acc.y,
      });
    }
  }

  drawHUD(render) {
    var c = render.ctx;
    c.font = "32pt sans-serif";
    var scoreStr = zeroPad(this.properties.score, 6);
    var x = render.canvas.width / 30;
    var y = render.canvas.height / 20;

    c.fillStyle = "white";
    c.shadowColor = "rgba(0.7,0.7,0.7,0.9)";
    c.shadowBlur = 4;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillText(scoreStr, x, y);

    c.fillStyle = "rgba(0.7,0.7,0.7,0.2)";
    c.fillRect(render.canvas.width - 160, 8, 156, 76);

    c.fillStyle = "white";

    c.font = "16pt sans-serif";
    var livesStr =
      "❤️".repeat(this.properties.lives) +
      "🖤".repeat(this.properties.maxLives - this.properties.lives);
    var dsise = c.measureText(livesStr);
    c.fillText(livesStr, render.canvas.width - dsise.width - 10, y);

    var moneyStr = "💰" + zeroPad(this.properties.coins, 5);
    dsise = c.measureText(moneyStr);
    c.fillText(moneyStr, render.canvas.width - dsise.width - 10, y + 28);

    var mushroomsStr = "🍄" + zeroPad(this.properties.mushrooms, 2);
    c.fillText(mushroomsStr, render.canvas.width - 150, y + 28);

    c.shadowColor = "none";
  }
}

export { DemoScene };
