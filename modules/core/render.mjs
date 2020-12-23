import {Layer} from './layer.mjs'

/**
 * A Rendering service to produce a rendering pipeline for all
 * GameObject. 
 */
class Render {
    constructor(game, canvas) {
        this.game    = game
        this.canvas  = canvas
        this.ctx     = canvas.getContext("2d")
        this.removeAll()
    }

    /**
     * Add a GameObject to the rendering pipeline.
     * Is no Layer exists for this object.layer index, a Layer is created and added to te pipeline.
     * lis of objects int the layer are sorted according to the object.priority value.
     * @param object the object  to be added to the rendering pipeline.
     */
    add(object) {
        var layer;
        if (!this.objects.includes(object)) {
            this.objects.push(object)
            if (this.layersMap.get(object.layer) === undefined) {
                layer = new Layer(object.layer)
                this.layersMap.set(object.layer, layer)
                this.layers.push(layer)
            } else {
                layer = this.layersMap.get(object.layer)
            }
            layer.objects.push(object)
            layer.sort()
        }
    }

    /**
     * Remove an object from the rendering pipeline.
     * If the layer containing the object is empty, 
     * remove the layer.
     * @param object The object To be removed from the rendering pipeline
     */
    remove(object) {
        if (this.objects.includes(object)) {
            var layerToDelete = [];
            // remove the object
            for(var l = 0;l<this.layers.length;l++){
                var layer = this.layers[l] 
                for(var i =0;i<layer.objects.length;i++){
                    if(layer.objects[i]==object){
                        layer.objects.splice(i,1)
                    }
                }
                // the layer is empty ?
                if (layer.objects.length == 0) {
                    this.layers.splice(layer,1)
                }
            }
            // remove empty layer
            if (layerToDelete.length > 0) {
                layerToDelete.forEach(ltd => {
                    this.layersMap.remove(ltd.index)
                    this.layers.remove(ltd)

                })
                layerToDelete = []
            }
        }
    }

    removeAll(){
        this.objects=[]
        this.layers=[]
        this.layersMap = new Map()
    }

    /**
     * Clear the view on the context.
     * @param ctx CanvasRenderingContext to be used 
     */
    clear(){
        this.ctx.fillStyle = 'navy' 
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
    * Draw all objects
    */
    draw(elapsed,startTime) {

        this.clear()

        // Display all objects
        if(this.layers.length>0){
            this.layers.forEach(layer => {
                layer.objects.forEach(o => {
                    if(o.active && (o.duration>0||o.duration==-999)){
                        o.draw(this.ctx)
                    }
                })
            })
        }


        // Display pause mode if needed.
        if(this.game.pause){
            this.game.scene.drawPause(this)       
        }

        // Draw Head-Up-Display (if exists)
        this.game.scene.drawHUD(this)

        // Display depbug information if needed.
        if(this.game.debug>0){
            this.drawDebugInfo()
            this.drawDebugLineInfo(elapsed,startTime)    
        }

    }

    drawDebugLineInfo(elapsed,startTime){
        var runForInSec = Math.round(startTime/1000)
        var frameTime = Math.round(elapsed)
        var FPS = Math.round(1000/frameTime,2)
                    var c = this.ctx
            c.font = '12pt courier new';
            var debugstr = "["
                + "fps:"+FPS
                + "|dbg:"+this.game.debug 
                + "|objs:"+this.objects.length
                + "|activ:"+this.game.scene.activeNumber
                + "|f:"+frameTime
                + "|t:"+runForInSec
                + "|pause:"+(this.game.pause?"on ":"off")
                + "]"

            var dsize = c.measureText(debugstr)
            c.fillStyle='#FFAA00'
            c.fillRect(0,this.canvas.height,this.canvas.width,-24)
            c.fillStyle='white'
            c.fillText(debugstr,4,this.canvas.height-6)
    }
 
    drawDebugInfo(){

        var c = this.ctx
        // Prepare shadow
        c.shadowColor   = 'rgba(0.2,0.2,0.2,0.6)';
        c.shadowBlur    = 2;
        c.shadowOffsetX = 4;
        c.shadowOffsetY = 4;

        if( this.layers.length > 0){
            this.layers.forEach(layer => {
                layer.objects.forEach(o => {
                    if(o.active && (o.duration>0||o.duration==-999)){
                        this.drawDebugObject(c,o)
                    }
                })
            })
        }
        c.shadowColor   = 'none';
        c.shadowBlur    = 0;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
    }

    drawDebugObject(c,o){
        if(this.game.debug>1){
            var bgColor='rgba(0.1,0.1,0.1,0.3)'
            var dashColor='darkgray'
            var dbgTxtColor='orange'
            c.font = '8pt sans-serif';
            // Prepare debug information for this object
            let dbg=[]
            dbg.push({attr:"id",value:o.name})
            dbg.push({attr:"pos",value:Math.round(o.position.x)
                + ","   + Math.round(o.position.y)})
            dbg.push({attr:"size",value:Math.round(o.size.width)
                + ","   + Math.round(o.size.height)})
            dbg.push({attr:"vel",value:Math.round(o.velocity.x)
                + ","   + Math.round(o.velocity.y)})
            dbg.push({attr:"acc",value:Math.round(o.acceleration.x)
                + ","   + Math.round(o.acceleration.y)})

            // Display debug information
            let dx=0
            if(o.position.x>this.game.canvas.width -140){
                // Draw a small line 
                c.setLineDash([4,4]);
                c.strokeStyle = dashColor
                c.beginPath();
                c.moveTo(o.position.x,o.position.y);
                c.lineTo(o.position.x-40, o.position.y);
                c.stroke();

                c.setLineDash([1,2,1,3]);
                c.fillStyle=bgColor
                c.fillRect(o.position.x-36,
                    o.position.y,-100,12*(dbg.length+1))

                // draw BoundingBox
                c.strokeRect(
                    o.position.x-o.size.width/2,
                    o.position.y-o.size.height/2,
                    o.size.width,
                    o.size.height)
                // draw text information
                c.fillStyle=dbgTxtColor
                dbg.forEach(ld=>{
                    c.fillText(ld.attr+":"+ld.value,
                        o.position.x-130,
                        o.position.y+((dx+1)*12));
                        dx+=1
                })

            }else{
                // Draw a small line 
                c.setLineDash([4,4]);
                c.strokeStyle = dashColor
                c.beginPath();
                c.moveTo(o.position.x,o.position.y);
                c.lineTo(o.position.x+40, o.position.y);
                c.stroke();

                c.setLineDash([1,2,1,3]);
                c.fillStyle=bgColor
                c.fillRect(o.position.x+36,
                    o.position.y,100,12*(dbg.length+1))

                c.strokeRect(
                    o.position.x-o.size.width/2,
                    o.position.y-o.size.height/2,
                    o.size.width,
                    o.size.height)

                c.fillStyle=dbgTxtColor
                dbg.forEach(ld=>{
                    c.fillText(ld.attr+":"+ld.value,
                        o.position.x+40,
                        o.position.y+((dx+1)*12));
                        dx+=1
                })

            }
        }
    }

    resize(stageConfig){
      this.canvas.width = stageConfig.width
      this.canvas.height = stageConfig.height
    }
}

export {Render}