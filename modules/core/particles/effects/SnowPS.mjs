import { ParticleSystem } from "/modules/core/particles/ParticleSystem.mjs";
import { Particle } from "/modules/core/particles/Particle.mjs";

class SnowPS extends ParticleSystem {
  constructor(game, name, nbParticules) {
    super(game, name, nbParticules);
    this.color = "#ffffff";
  }

  createParticle() {
    var p = new Particle(
      Math.random() * this.game.canvas.width + 200 - 150,
      Math.random() * this.game.canvas.height
    );
    p.oldPos.x = p.position.x;
    p.oldPos.y = p.position.y;

    p.speed.x = 1;
    p.speed.y = Math.random() * 2 + 1;
    return p;
  }

  updateParticle(d, elapsed) {
    if (d.position.y > this.game.canvas.height) {
      d.position.x = Math.random() * this.game.canvas.width + 200 - 150;
      d.position.y = 0;
      d.oldPos.x = d.position.x;
      d.oldPos.y = d.position.y;

      d.speed.y = Math.random() * 2 + 1;
    } else {
      d.speed.x = Math.cos(Math.random() * elapsed) * 2;
    }
  }

  draw(c) {
    this.drops.forEach((p) => {
      c.fillStyle = this.color;
      c.fillRect(p.position.x, p.position.y, 3, 3);
    });
  }
}
export { SnowPS };
