class Particle {
  constructor(px, py) {
    this.position = {
      x: px | 0,
      y: py | 0,
    };
    this.oldPos = {
      x: px | 0,
      y: py | 0,
    };
    this.speed = {
      x: px | 0,
      y: py | 0,
    };
    this.size = {
      width:1,
      height:1
    }
    this.duration = -1;
    this.age = 0;
    this.lifetime = 4000;
    this.active = true;
    this.color = "rgb(255,255,255,1)";
  }
}
export { Particle };
