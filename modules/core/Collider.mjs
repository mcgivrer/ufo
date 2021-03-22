class Collider {
    constructor(scene){
        this.scene=scene
        this.objects=[]
    }

    add(go){
        this.objects.push(go);
    }
    remove(go){
        if(this.objects.contains(go)){
            thi.objects.remove(go)
        }
    }

    clear(){
        this.objects=[];
    }

    update(){
        this.objects.forEach(o=>{
            for(var i=0;i<this.objects.length;i++){
                if( o !== this.objects[0]
                    && o.bbox.intersect(this.objects[i].bbox)){
                    if(o.collisionResponse){
                        o.collisionResponse(this.objects[i])
                    }
                }
            }
        })
    }
}
export { Collider }