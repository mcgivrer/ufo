class Scene{
    constructor(g){
        this.game = g;
        this.objects = []
        this.activeNumber = 0;
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

    clearAllObjects(){
        tis.game.render.clearAllObjects()
        this.objects=[]
        this.activeNumber=0
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
        this.activeNumber = 0;
        this.objects.forEach(o=>{
            if(o.active){
                this.activeNumber++;
            }
        })
    }

    draw(render,elapsed,startTime){
        render.draw(elapsed,startTime)
    }

    drawPause(render){
        var c = render.ctx

        c.font = '24pt sans-serif';
        var pauseStr='PAUSE'
        var psize = c.measureText(pauseStr)
        var y = 2*render.canvas.height/5

        c.fillStyle = 'black'
        c.fillRect(-10,y+4,render.canvas.width+20,-32)
        c.fillStyle='white'
        c.shadowColor   = 'rgba(0.2,0.2,0.2,0.6)';
        c.shadowBlur    = 4;
        c.shadowOffsetX = 2;
        c.shadowOffsetY = 2;
        c.fillText(pauseStr,(render.canvas.width-psize.width)/2,y)
        c.shadowBlur    = 0;
    }

    drawHUD(render){
        
    }
}

export {Scene};
