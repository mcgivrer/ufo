import { Game } from './game.mjs'
import { GameObject } from './gameobject.mjs'
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
        this.objects = []
        this.layers  = []
        this.layersMap = new Map()
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
            this.layers.forEach(layer => {
                if (layer.objects.includes(object)) {
                    layer.objects.remove(object)
                }
                // the layer is empty ?
                if (layer.objects.length == 0) {
                    layerToDelete = layer
                }
            })
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

    /**
     * Clear the view on the context.
     * @param ctx CanvasRenderingContext to be used 
     */
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }


    /**
    * Draw all objects
    */
    draw(elapsed,startTime) {

        var runForInSec = Math.round(startTime/1000)
        var frameTime = Math.round(elapsed)
        var FPS = Math.round(1000/frameTime,2)
        this.clear()
        if(this.layers.length>0){
            this.layers.forEach(layer => {
                layer.objects.forEach(o => {
                    o.draw(this.ctx)
                })
            })
        }
        if(this.game.debug>0){
            var c = this.ctx
            c.font = '16pt sans-serif';
            var debugstr = "["
                + "fps:"+FPS
                + "|dbg:"+this.game.debug 
                + "|objs:"+this.objects.length
                + "|f:"+frameTime
                + "|t:"+runForInSec
                + "|pause:"+(this.game.pause?"on":"off")
                + "]"
            var dsize = c.measureText(debugstr)
            c.fillStyle='#FFAA00'
            c.fillRect(0,this.canvas.height,this.canvas.width,-24)
            c.fillStyle='black'
            c.fillText(debugstr,4,this.canvas.height-6)
        }
    }


    resize(stageConfig){
      this.canvas.width = stageConfig.width
      this.canvas.height = stageConfig.height
    }
}

export {Render}