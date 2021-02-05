class Particle {
  constructor(parent, color,duration) {
    this.parent = parent;
    this.pos = parent.pos;
    this.velocity = parent.velocity;
    this.color = color;
    this.duration = duration;
    this.active = true;
  }

  update(parent, elapsed) {
    if (this.active) {
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;
      this.duration = this.duration - elasped > 0 ? this.duration - elasped : 0;
      this.active = this.duration > 0;
    }
  }
}

export default Particle;
