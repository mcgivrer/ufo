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
}

export {Scene};
