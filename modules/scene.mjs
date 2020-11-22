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
            var c = this.game.ctx
            c.font = '16pt sans-serif';
            var debugstr = "debug:"+this.game.debug
            var dsize = c.measureText(debugstr)
            c.fillStyle='#996600'
            c.fillRect(4,this.game.stageConfig.height,this.game.stageConfig.width,-24)
            c.fillStyle='black'
            c.fillText(debugstr,10,this.game.stageConfig.height-4)
        }
    }
}

export {Scene};
