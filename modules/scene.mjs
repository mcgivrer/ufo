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

    update(elapsed){
          this.objects.forEach(o=>{
            o.update()
            if( o.position.x>this.game.stageConfig.width-o.size.width || 
                o.position.x<0){
                o.velocity.x=-o.velocity.x
            }
            if( o.position.y>this.game.stageConfig.height-o.size.height || 
                o.position.y<0){
                o.velocity.y=-o.velocity.y
            }
        });
    }

    draw(ctx){
        this.objects.forEach(o=>{
            o.draw(this.game.ctx)
        });
        if(this.game.debug>0){
            this.game.ctx.font = '24px serif';
            var debugstr = "debug:"+this.game.debug
            var dsize = this.game.ctx.measureText(debugstr)
            
            this.game.ctx.fillColor='orange'
            this.game.ctx.fillRect(100-1,100-1,dsize.width+2,24+2)
            
            this.game.ctx.fillColor='white'
            this.game.ctx.fillText(debugstr,100,100)
        }
    }
}

export {Scene};
