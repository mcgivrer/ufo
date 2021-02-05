import GameObject from "/modules/core/gameobject.mjs";
import Particle from "/modules/core/math/particles/particle.mjs";
import ParticleType from "/modules/core/math/particles/particletype.mjs";

class ParticleSystem extends GameObject {
  constructor(name, x, y, nbMax) {
    super(name);
    this.position = { x: x, y: y };
    this.child = [];
    this.nbMax = nbMax;
    this.type = ParticleType.DEFAULT;
    this.generate(nbMax);
  }

  generate(nbMax) {
    for (var i = 0; i < nbMax; i++) {
      this.child.push(new Particle(this, "rgb(255,255,0,1)", 1000));
    }
  }

  animate(particle, elapsed) {
    particle.velocity.x *= 0.1;
    particle.velocity.y *= 0.1;

    if (particle.velocity.x < 0.00001) {
      particle.velocity.x = 0;
    }
    if (particle.velocity.y < 0.00001) {
      particle.velocity.y = 0;
    }
  }

  update(elapsed) {
    super.update(elapsed);
    this.child.foreach((p) => {
      this.animate(p, elapsed);
      p.update(this, elapsed);

      // Compute ParticleSystem BoundingBox
      this.size.width =
        p.position.x < this.position.x
          ? this.size.width + (this.position.x - p.position.x)
          : this.size.width;
      this.size.height =
        p.position.y < this.position.y
          ? this.size.height + (this.position.y - p.position.y)
          : this.size.height;

      this.size.width =
        p.position.x > this.position.x
          ? this.size.width - (p.position.x - this.position.x)
          : this.size.width;
      this.size.height =
        p.position.y > this.position.y
          ? this.size.height - (p.position.y - this.position.y)
          : this.size.height;
    });
  }
}

export default { ParticleType, ParticleSystem };
