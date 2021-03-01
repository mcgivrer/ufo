import { ParticleSystem } from "/modules/core/particles/ParticleSystem.mjs";
import { Particle } from "/modules/core/particles/Particle.mjs";

class RainPS extends ParticleSystem {
  constructor(game, name, nbParticules) {
    super(game, name, nbParticules);

    this.color = "#ddd";
  }

  createParticle() {
    var p = new Particle(
      (Math.random() * this.game.canvas.width + 200) - 200,
      Math.random() * this.game.canvas.height
    );
    p.oldPos.x = p.position.x;
    p.oldPos.y = p.position.y;

    p.speed.x = 1;
    p.speed.y = Math.random() * 10 + 15;
    return p;
  }

  updateParticle(d, elapsed) {
    if (d.position.y > this.game.canvas.height) {
      d.position.x = (Math.random() * this.game.canvas.width + 200) - 200;
      d.position.y = 0;
      d.oldPos.x = d.position.x;
      d.oldPos.y = d.position.y;

      d.speed.y = Math.random() * 10 + 15;
    }
  }

  draw(c) {
    c.fillStyle = this.color;

    this.drops.forEach((p) => {
      c.beginPath();
      c.moveTo(p.oldPos.x, p.oldPos.y);
      c.lineTo(p.position.x, p.position.y);
      c.stroke();
    });
  }
}
export { RainPS };
