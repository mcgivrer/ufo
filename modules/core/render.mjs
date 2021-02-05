import { Layer } from "./layer.mjs";
import GameObjectType from "./gameobjecttype.mjs";

/**
 * A Rendering service to produce a rendering pipeline for all
 * GameObject.
 */
class Render {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.clearAllObjects();
    this.camera = undefined;
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
      this.objects.push(object);
      if (this.layersMap.get(object.layer) === undefined) {
        layer = new Layer(object.layer);
        this.layersMap.set(object.layer, layer);
        this.layers.push(layer);
      } else {
        layer = this.layersMap.get(object.layer);
      }
      layer.objects.push(object);
      layer.sort();
    }
  }
  setCamera(camera) {
    this.camera = camera;
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
      for (var l = 0; l < this.layers.length; l++) {
        var layer = this.layers[l];
        for (var i = 0; i < layer.objects.length; i++) {
          if (layer.objects[i] == object) {
            layer.objects.splice(i, 1);
          }
        }
        // the layer is empty ?
        if (layer.objects.length == 0) {
          this.layers.splice(layer, 1);
        }
      }
      // remove empty layer
      if (layerToDelete.length > 0) {
        layerToDelete.forEach((ltd) => {
          this.layersMap.remove(ltd.index);
          this.layers.remove(ltd);
        });
      }
    }
  }

  removeAll() {
    this.objects = [];
    this.layers = [];
    this.layersMap.clear();
  }

  /**
   * Clear the view on the context.
   * @param ctx CanvasRenderingContext to be used
   */
  clear() {
    this.ctx.fillStyle = "navy";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearAllObjects() {
    this.objects = [];
    this.layers = [];
    this.layersMap = new Map();
  }

  /**
   * Draw all objects
   */
  draw(elapsed, startTime) {
    this.clear();
    if (this.camera !== undefined) {
      this.ctx.translate(-this.camera.position.x, -this.camera.position.y);
    }
    // Display all objects
    if (this.layers.length > 0) {
      this.layers.forEach((layer) => {
        layer.objects.forEach((o) => {
          if (o.active && (o.duration > 0 || o.duration == -999)) {
            this.draw(this.ctx,o,elapsed);
          }
        });
      });
    }
    if (this.camera !== undefined) {
      this.ctx.translate(this.camera.position.x, this.camera.position.y);
    }

    // Display pause mode if needed.
    if (this.game.pause) {
      this.game.scene.drawPause(this);
    }

    // Draw Head-Up-Display (if exists)
    this.game.scene.drawHUD(this);

    // Display depbug information if needed.
    if (this.game.debug > 0) {
      this.drawDebugInfo();
      this.drawDebugLineInfo(elapsed, startTime);
    }
  }

  drawObject(ctx, go, elasped) {
    switch (go.type) {
      case GameObjectType.POINT:
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(go.pos.x, go.pos.y, go.pos.x, go.pos.y);
        break;
      case GameObjectType.RECTANGLE:
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(go.pos.x, go.pos.y, go.size.width, go.size.height);
        break;
      case GameObjectType.CIRCLE:
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillArc(go.pos.x, go.pos.y, go.size.width, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case GameObjectType.IMAGE:
        if (go.image) {
          ctx.drawImage(
            go.image,
            go.pos.x,
            go.pos.y,
            go.size.width,
            go.size.height
          );
        }
        break;
    }
  }

  drawDebugLineInfo(elapsed, startTime) {
    var runForInSec = Math.round(startTime / 1000);
    var frameTime = Math.round(elapsed);
    var FPS = Math.round(1000 / frameTime, 2);
    var c = this.ctx;
    c.font = "12pt courier new";
    var debugstr =
      "[" +
      "fps:" +
      FPS +
      "|dbg:" +
      this.game.debug +
      "|objs:" +
      this.objects.length +
      "|activ:" +
      this.game.scene.activeNumber +
      "|f:" +
      frameTime +
      "|t:" +
      runForInSec +
      "|pause:" +
      (this.game.pause ? "on " : "off") +
      "]";

    var dsize = c.measureText(debugstr);
    c.fillStyle = "#FFAA00";
    c.fillRect(0, this.canvas.height, this.canvas.width, -(dsize.height+4));
    c.fillStyle = "white";
    c.fillText(debugstr, 4, this.canvas.height - 6);
  }

  drawDebugInfo() {
    var c = this.ctx;
    // Prepare shadow
    c.shadowColor = "rgba(0.2,0.2,0.2,0.6)";
    c.shadowBlur = 2;
    c.shadowOffsetX = 4;
    c.shadowOffsetY = 4;

    if (this.layers.length > 0) {
      this.layers.forEach((layer) => {
        layer.objects.forEach((o) => {
          if (o.active && (o.duration > 0 || o.duration == -999)) {
            this.drawDebugObject(c, o);
          }
        });
      });
    }
    c.shadowColor = "none";
    c.shadowBlur = 0;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
  }

  drawDebugObject(c, o) {
    if (this.game.debug > 1 && o.debug && o.debug > 1) {
      var bgColor = "rgba(0.1,0.1,0.1,0.3)";
      var dashColor = "darkgray";
      var dbgTxtColor = "orange";
      c.font = "8pt sans-serif";
      // Prepare debug information for this object
      let dbg = [];
      dbg.push({
        attr: "id",
        value: o.name,
      });
      dbg.push({
        attr: "pos",
        value: Math.round(o.position.x) + "," + Math.round(o.position.y),
      });
      dbg.push({
        attr: "size",
        value: Math.round(o.size.width) + "," + Math.round(o.size.height),
      });
      dbg.push({
        attr: "vel",
        value: Math.round(o.velocity.x) + "," + Math.round(o.velocity.y),
      });
      dbg.push({
        attr: "acc",
        value:
          Math.round(o.acceleration.x) + "," + Math.round(o.acceleration.y),
      });

      // Display debug information

      var props = {
        px: -100 - o.size.width,
        py: -20,
        dx: 4,
        dy: 8,
        dbgTxtColor: dbgTxtColor,
        dashColor: dashColor,
        bgColor: bgColor,
        text: dbg,
      };
      if (o.position.x > (this.game.canvas.width - o.size.width) / 2) {
        props = {
          ...props,
          px: -100 - o.size.width,
        };
      } else {
        props = {
          ...props,
          px: 40,
        };
      }
      if (
        o.position.y >
        (this.game.canvas.height - o.size.height - 12 * dbg.length) / 2
      ) {
        props = {
          ...props,
          py: -(12 * dbg.length) - 20,
        };
      } else {
        props = {
          ...props,
          py: -20,
        };
      }
      this.renderDebugInfoForGO(c, o, props);
    }
  }

  renderDebugInfoForGO(c, o, props) {
    // Draw a small line
    c.setLineDash([4, 4]);
    c.strokeStyle = props.dashColor;
    c.beginPath();
    c.moveTo(o.position.x, o.position.y);
    c.lineTo(o.position.x + props.px, o.position.y + props.py);
    c.stroke();

    // draw background
    c.setLineDash([1, 2, 1, 3]);
    c.fillStyle = props.bgColor;
    c.fillRect(
      o.position.x + props.px - 4,
      o.position.y + props.py,
      100,
      12 * (props.text.length + 1)
    );

    // draw BoundingBox
    c.strokeRect(
      o.position.x - o.size.width / 2,
      o.position.y - o.size.height / 2,
      o.size.width,
      o.size.height
    );

    // draw text information
    c.fillStyle = props.dbgTxtColor;
    var dx = 0;
    props.text.forEach((ld) => {
      c.fillText(
        ld.attr + ":" + ld.value,
        o.position.x + props.px,
        o.position.y + props.py + (dx + 1) * 12
      );
      dx += 1;
    });
  }
  resize(stageConfig) {
    this.canvas.width = stageConfig.width;
    this.canvas.height = stageConfig.height;
  }
}

export { Render };
