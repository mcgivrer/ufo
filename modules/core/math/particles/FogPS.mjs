import { ParticleSystem } from "/modules/core/math/particles/ParticleSystem.mjs";
import { Particle } from "/modules/core/math/particles/Particle.mjs";

class FogPS extends ParticleSystem {
  constructor(game, name) {
    super(game, name, 30);
    this.smokeSpriteSize = 100;
    this.opacities = [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,3,5,5,7,4,4,1,1,0,1,0,0,0,0,0,1,0,0,17,27,41,52,56,34,23,15,11,4,9,5,1,0,0,0,0,0,0,1,45,63,57,45,78,66,52,41,34,37,23,20,0,1,0,0,0,0,1,43,62,66,64,67,115,112,114,56,58,47,33,18,12,10,0,0,0,0,39,50,63,76,87,107,105,112,128,104,69,64,29,18,21,15,0,0,0,7,42,52,85,91,103,126,153,128,124,82,57,52,52,24,1,0,0,0,2,17,41,67,84,100,122,136,159,127,78,69,60,50,47,25,7,1,0,0,0,34,33,66,82,113,138,149,168,175,82,142,133,70,62,41,25,6,0,0,0,18,39,55,113,111,137,141,139,141,128,102,130,90,96,65,37,0,0,0,2,15,27,71,104,129,129,158,140,154,146,150,131,92,100,67,26,3,0,0,0,0,46,73,104,124,145,135,122,107,120,122,101,98,96,35,38,7,2,0,0,0,50,58,91,124,127,139,118,121,177,156,88,90,88,28,43,3,0,0,0,0,30,62,68,91,83,117,89,139,139,99,105,77,32,1,1,0,0,0,0,0,16,21,8,45,101,125,118,87,110,86,64,39,0,0,0,0,0,0,0,0,0,1,28,79,79,117,122,88,84,54,46,11,0,0,0,0,0,0,0,0,0,1,0,6,55,61,68,71,30,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,23,25,20,12,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,12,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,0,0,0,0,0,0,0,0]
  }

  createParticle() {
    var p = new Particle(
      Math.random() * this.game.canvas.width * 2 - this.game.canvas.width,
      Math.random() * this.game.canvas.height
    );
    p.speed.x = Math.random();
    p.speed.y = 0;
    p.size.width = Math.random() * 300 + 200;
    p.size.height = p.size.width * 0.6;
    return p;
  }

  updateParticle(d, elapsed) {
    if (d.position.x - d.size.width > this.game.canvas.height) {
      d.position.x =
        Math.random() * this.game.canvas.width * 2 -
        (this.game.canvas.width + d.size.width);
      d.position.y =
        Math.random() * this.game.canvas.height * 2 -
        (this.game.canvas.height + d.size.height);
      d.oldPos.x = d.position.x;
      d.oldPos.y = d.position.y;

      d.speed.x = Math.random();
      d.speed.y = 0;
    }
  }

  makeSmokeSprite(c, color){
    color = color || [24, 46.8, 48.2]
    var smokeSprite = document.createElement('canvas'),
        ctx = smokeSprite.getContext('2d'),
        data = ctx.createImageData(this.smokeSpriteSize, this.smokeSpriteSize),
        d = data.data

    for(var i=0;i<d.length;i+=4){
        d[i]=color[0]
        d[i+1]=color[1]
        d[i+2]=color[2]
        d[i+3]=this.opacities[i / 4]
    }

    smokeSprite.width = this.smokeSpriteSize
    smokeSprite.height = this.smokeSpriteSize

    ctx.putImageData(data,0,0)

    return smokeSprite
  }

  initRendering(c){
    this.smokeParticleImage = this.makeSmokeSprite(c)
  }


  draw(c) {
    this.color = "rgb(255,255,255);";
    this.drops.forEach((p) => {
      c.globalAlpha = (1-Math.abs(1-2*p.age/p.lifetime))/8

      var off = p.size.width/2
      var xmin = p.position.x - off
      var xmax = xmin + off*2
      var ymin = p.position.y - off
      var ymax = ymin + off*2

      c.drawImage(this.smokeParticleImage, xmin, ymin, xmax-xmin, ymax-ymin)
      
    });
    c.globalAlpha = 1;
  }
}
export { FogPS };
