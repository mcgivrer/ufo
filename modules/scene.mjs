class Scene{
    constructor(g){
        this.game = g;
        this.objects = []
    }

    add(o){
        this.objects.push(o)
    }

    init(){

    }

    keyPressed(e){
  
    }
    
    keyReleased(e){
        switch(e.keyCode){
            case 82:
              this.init(this.game)
              break;
        }
    }

    update(elapsed){
          this.objects.forEach(o=>{
            o.update()
            if(o.isConstrainedToWindow){
                if( o.position.x>this.game.stageConfig.width-o.size.width || 
                    o.position.x<o.size.width){
                    o.velocity.x=-o.velocity.x
                }
                if( o.position.y>this.game.stageConfig.height-o.size.height || 
                    o.position.y<o.size.height){
                    o.velocity.y=-o.velocity.y
                }                
            }
        });
    }

    draw(ctx){
        this.objects.forEach(o=>{
            o.draw(this.game.ctx)
        });
        if(this.game.debug>0){
            var c = this.game.ctx
            c.font = '16pt sans-serif';
            var debugstr = "<|dbg:"+this.game.debug + "|objs:"+this.objects.length+"|>"
            var dsize = c.measureText(debugstr)
            c.fillStyle='#FFAA00'
            c.fillRect(0,this.game.stageConfig.height,this.game.stageConfig.width,-24)
            c.fillStyle='black'
            c.fillText(debugstr,4,this.game.stageConfig.height-6)
        }
    }
}

export {Scene};
