import {GameObject} from './gameobject.mjs';
import {DemoScene} from './demoscene.mjs'

class Game {
    constructor(canvasId,type) {
      this.canvas = document.querySelector(canvasId);
      this.ctx = this.canvas.getContext(type);
      window.addEventListener('keydown',this.keyPressed.bind(this),false);
      window.addEventListener('keyup',this.keyReleased.bind(this),false);
      window.addEventListener('resize',this.resizeCanvas.bind(this),false);

      this.scenes = [new DemoScene(this)]
      this.scene  = this.scenes[0]
      this.debug  = 0

      this.resizeCanvas()
    }

    init(){
      this.scene.init(this)
    }
    
    resizeCanvas() {
      this.stageConfig = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.canvas.width = this.stageConfig.width
      this.canvas.height = this.stageConfig.height
      this.update();
    }

    keyPressed(e){
      this.scene.keyPressed(e)
    }

    keyReleased(e){

      var code = e.keyCode
      switch(code){
        case 68:
          this.debug = ( this.debug == 6 ? this.debug = 0 : this.debug + 1)
          break;
        default:
          console.log('event key released code:'+code);
          break;
      }

      this.scene.keyReleased(e)
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