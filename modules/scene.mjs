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
        });
    }

    draw(ctx){
          this.objects.forEach(o=>{
            o.draw(this.game.ctx)
        });
    }
}

export {Scene};
