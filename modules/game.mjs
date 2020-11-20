import {GameObject} from './gameobject.mjs';
import {DemoScene} from './demoscene.mjs'

class Game {
    constructor(canvasId,type) {
      this.canvas = document.querySelector(canvasId);
      this.ctx = this.canvas.getContext(type);
      this.stageConfig = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.canvas.width = this.stageConfig.width
      this.canvas.height = this.stageConfig.height
      this.scenes = [new DemoScene(this)]
      this.scene = this.scenes[0]
    }

    init(){

    }

  
    update(elapsed) {
      // clear screen
      this.ctx.clearRect(0, 0, this.stageConfig.width, this.stageConfig.height)
      // draw objects
      if(this.scene){
        this.scene.update(elapsed)
        this.scene.draw(this.ctx)
      }
    }
  
    run() {
      this.init()
      this.update()
    }
  }

export {Game};