import { ParticleSystem } from "/modules/core/math/particles/ParticleSystem.mjs";
import { Particle } from "/modules/core/math/particles/Particle.mjs";

class FogPS extends ParticleSystem {
  constructor(game, name, nbParticules) {
    super(game, name, nbParticules);

    this.color = "rgba(200,200,200,0.2)";
  }

  createParticle() {
    var p = new Particle(
      Math.random() * this.game.canvas.width,
      Math.random() * this.game.canvas.height
    );
    p.oldPos.x = p.position.x;
    p.oldPos.y = p.position.y;

    p.speed.x = Math.random();
    p.speed.y = Math.random();
    return p;
  }

  updateParticle(d, elapsed) {
    if (d.position.y > this.game.canvas.height) {
      d.position.x = (Math.random() * this.game.canvas.width + 200) - 300;
      d.position.y = (Math.random() * this.game.canvas.height + 200) - 300;
      d.oldPos.x = d.position.x;
      d.oldPos.y = d.position.y;

      d.speed.y = Math.random();
    }
  }

  draw(c) {
    c.fillStyle = this.color;

    this.drops.forEach((p) => {
      c.beginPath();
      c.arc(p.position.x, p.position.y, 
            (Math.random()*300)+200, 
            Math.PI * 2,false);
      c.stroke();
    });
  }
}
export { FogPS };
