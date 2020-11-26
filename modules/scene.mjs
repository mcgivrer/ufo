class Scene{
    constructor(g){
        this.game = g;
        this.objects = []
    }

    add(o){
        this.objects.push(o)
        this.objects.sort((o1,o2)=>{
            return o1.layer>o2.layer?1:-1
        })
        this.game.render.add(o)
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
                if( o.position.x > this.game.stageConfig.width-o.size.width){
                    o.velocity.x =- o.velocity.x
                    o.position.x = this.game.stageConfig.width-o.size.width
                }
                if( o.position.x < o.size.width){
                    o.velocity.x = -o.velocity.x
                    o.position.x = o.size.width
                }
                if( o.position.y > this.game.stageConfig.height-o.size.height){
                    o.velocity.y = -o.velocity.y
                    o.position.y = this.game.stageConfig.height-o.size.height
                }                
                if( o.position.y < o.size.height){
                    o.velocity.y = -o.velocity.y
                    o.position.y = o.size.height
                }                
            }
        });
    }

    draw(render,elapsed){
        render.draw(elapsed)
    }
}

export {Scene};
