let ParticleType = {
  POINT: 1,
  CIRCLE: 2,
  RECTANGLE: 3,
  IMAGE: 4,
};

class ParticleSystem extends GameObject {
  constructor(nbMax) {
    super();
    this.particles = [];
    this.nbMax = nbMax;
    this.type = ParticleType.DEFAULT;
  }
  update(elapsed) {
    super.update(elapsed);
    particles.foreach((p) => {});
  }
  draw(context) {
    particles.foreach((p) => {
      switch (this.type) {
        case ParticleType.POINT:
          context.draw;
          break;
        case ParticleType.CIRCLE:
          break;
        case ParticleType.RECTANGLE:
          break;
        case ParticleType.IMAGE:
          break;
      }
    });
  }
}

export default ParticleSystem;
