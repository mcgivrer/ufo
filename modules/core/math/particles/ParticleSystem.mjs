import { GameObject, GO_NODURATION } from "/modules/core/GameObject.mjs";
import { Particle } from "/modules/core/math/particles/Particle.mjs";

class ParticleSystem extends GameObject {
  constructor(game, name, nbDrops) {
    super(name);
    this.game = game;
    this.drops = new Array(nbDrops);
    this.color = "#aaa";
    this.properties.physicType = "STATIC";
    this.duration = GO_NODURATION;
    this.create();
    this.renewParticle = true;
    this.size={
      width: game.canvas.width,
      height: game.canvas.height
    }
  }
  
  createParticle() {

  }
  
  create() {
    for (var i = 0; i < this.drops.length; i++) {
      var p = this.createParticle();
      this.drops[i] = p;
    }
  }


  updateParticle(p,elapsed){

  }

  update(elapsed) {
    this.drops.forEach((d) => {
      if (d.active) {
        d.oldPos.x = d.position.x;
        d.oldPos.y = d.position.y;

        d.position.x += d.speed.x;
        d.position.y += d.speed.y;

        if (d.duration == 0) {
          d.active = false;
        }
        if(this.renewParticle){
          this.updateParticle(d,elapsed);
        }
        if (d.duration != -1) {
          d.duration -= 1;
        }
      }
    });
    super.update(elapsed)

  }

  draw(c) {
    c.fillStyle = this.color;
    this.drops.forEach((d) => {
      c.fillRect(d.position.x, d.position.y, 2, 2);
    });
  }
}
export { ParticleSystem };
