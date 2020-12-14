---
title: UFO | A 2D Javascript game
author: Frédéric Delorme
createdat: 2020-11-28
tags: |
  - javascript
  - gamedev
  - 2d
  - arcade
description: |
  This project is a tutorial on how to develop javascript game with minimalistic framework. 
--- 
# UFO
## A 2D Javascript game

Novembre, 29th 2020, by Frédéric Delorme.

## Introduction

This is a little overview of what can be a 2D game based on the javascript language. You will find all the code at [https://github.com/mcgivrer/ufo](https://github.com/mcgivrer/ufo).
The project is developed by myself, and you could contact me for any question at [https://gitter.im/SnapGames/ufo](https://gitter.im/SnapGames/ufo).

>**NOTE**
>You will need to know how to code classes and modules with javascript, but you won’t need to know anything about game development.

## Basic javascript framework

To start with our new javascript game, we will need some basic knowledge about how to interface UI and input with our game. With some clearer purposes, how to interact between the gamer and the screen.

Some information about this small project. The structure of the project is as below:

```text
ufo/
|_ modules
|_ styles
|_ index.html
|_ README.md
|_ LICENSE
|_ package.json
```

_illustration 1 - The Project directory structure._

Javascript files are saved into the modules folder, the css file is stored into the styles folder. `index.html` is the entry point for our project, and the package.json defines some development resources.
You will also find the traditional `README.md` and `LICENSE` files.
The first thing to study is the index.html file, where any web project starts from.

A Story to build a game with.
The story we talk about is the scenario of the game. Simple.

You are an UFO and need to collect samples from planets to examine and study species from outer space.

From a space map, you navigate through some star system, detect planets and collect samples and species from populated planets.

There will be 3 kind of gameplay:

1. use the space map to discover star system,
2. navigate to identified star system planets through asteroids field,
3. collect samples and species by teleporting them into your spaceship (UFO)

But you will have to add something to your mission: collect fuel to keep your spaceship up and run, and fill some discoveries to achieve missions and earn space money.

Here is the screen map of the game, as a development guide to, step by step, build the game.

```dotaa
+----------+
|  Title   |
+----+-----+
     |
+----v-----+    +---------+    +----------+    +------------+    +------------+
|  Menu    +--->| Mission +--->|  Star    +--->| Asteroid   +--->| Planet     |
|          |    |   Board |    |    Map   |    |    Field   |    |    Flight  |
+----+-----+    +---------+    +----------+    +------------+    +------------+
     |
+----v-----+
| Settings |
+----------+
```

_illustration 1 - The Game map where all screens appear._

All those screens will be developed in this small project.
But to realize such a game, we need some basic elements, a basement for all the code we need to create.
Here is a small overview of the classes we will manage in this javascript framework.


![class diagram for the UFO project](https://www.planttext.com/api/plantuml/img/XP6n3i8W48Ptde8mrdHmPUgWSTJO9q1wQJ4K6ZYDZV7TfK2r7OmCSFzzVuu_K7aK3c-z9b8Bx-b1zF0aDAmDAjJ0QtJAjEIruCVB5IHcrs2zGcLDKdVGLYeSan9IWWOd8fydr18Cv7e7lOsQmWF1D6jw3XrmMPowqIkvDwqAV4f1YxBC5kwIyzDUclaGHO9iosZWh63f9kwdtQ_XTWL92ZX3mnPlm6qyF4av_fY-hHz6sIdTa2hC2X_o1W00)

_illustration 3 - The class diagram for our minimalistic game framework._

## Entry point index.html

So first, to display things in a javascript game, we first need a basic HTML page where to host our javascript.
Let’s go to basic a create a good old `index.html` page:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" 
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" 
          type="text/css" 
          href="styles/main.css">
    <title>UFO</title>
  </head>
  <body>
    <canvas id="ufo"></canvas>
    <script type="module" src="./modules/main.mjs"></script>
  </body>
</html>
```

_illustration 1 - the entry point: index.html_

A little bit of structure explanation. The `index.html` page, is a brave default piece of HTML.
The header will contain all not displayed information, let’s talk about metadata about the page, and the body will describe the visible part. from title to text and images in a standard page.
The header in our index page will define the title of the page with the `<title\>` tag, and set a default CSS file where to define global styles of rendering for any text or other visual tag in our page. this file will be the `styles/main.css` file. it will reset some default  behaviors of the browser and set some values for our own needs. we will dig with detail those css commands later.

## The Javascript main.mjs

The `main.mjs` file is a javascript module to start the `Game` object and request a frame update to the browser to call with constant frequency to update the game. This will call our game loop, through the `Game#update()` method.

```javascript
import {Game} from './game.mjs';
let start=0;
let game = new Game("ufo");
game.run();
requestAnimationFrame(step);
 function step(timestamp) {
  var progress;
  if (start === null) start = timestamp;
  progress = timestamp - start;
  game.update(progress)
  requestAnimationFrame(step);
}
```

_illustration 2 - code extract from file main.mjs_

So the main class `Game` is where all the things happened.

## The classes of the game

### The Game LOOP

As we’ve just touched 2 words about in the previous section, the game loop is where all things happened in a game. It will analyse user (gamer) input on keyboard, mouse or, why not gamepad, and compute corresponding action and changes on all the game, and finally, render all the game screen.

In our case, playing with a javascript program, we are forced to interact with a web browser and all the web entropy. the screen will be an HTML component where our program will intercept user interaction and display objects and colors into it.

The `<canvas/>` tag is the open door to all the needed technology we need to detect user or environment action, display 2D or 3D graphics, with some fancy tricks to draw with WebGL, a power interface to advanced graphics capabilities.

But the `Game` class itself only needs to manage the main loop.
The only way to request the browser to integrate the draw of our game with the web page rendering.  This will be achieved by calling the requestAnimationFrame function.

In the `main.mjs` file:

```javascript
function step(timestamp) {
  var progress;
  if (start === null) start = timestamp;
  progress = timestamp - start;
  game.update(progress)
  requestAnimationFrame(step);
}
```

_Illustration 3 - the Step method connecting web API with our game._

The step function links the `Game#update()` with the `requestAnimationFrame()`. So, let’s go and discover the `Game` class.

```javascript
class Game {
    constructor(canvasId) { }
    init(){ }
    resizeCanvas() { }
    keyPressed(e){ }
    keyReleased(e){ }  
    update(elapsed) { }
    run() { }
  }
export {Game};
```

_illustration 4 - The Game class, where all begin._

The first method called from `main.mjs` is the `Game` constructor. This where all the dependencies and services needed by our game will be initialized:

```javascript
constructor(canvasId) {
  this.canvas = document.getElementById(canvasId);
  window.addEventListener('keydown',
    this.keyPressed.bind(this),false);
  window.addEventListener('keyup',
    this.keyReleased.bind(this),false);
  window.addEventListener('resize',
    this.resizeCanvas.bind(this),false);

  this.scenes = [new DemoScene(this)]
  this.scene  = this.scenes[0]
  this.debug  = 0
  this.pause = false
      
  this.stageConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  this.canvas.width = this.stageConfig.width
  this.canvas.height = this.stageConfig.height

  this.render = new Render(this, this.canvas)
  this.physic = new PhysicEngine(this)
  this.lastTime  = 0
  this.update()
}
```

_illustration 5 - The constructor to rule them all._

First, we retrieve the canvas in the index.html page by its tag identifier.
Then, we link some javascript events to our code: `keydown`, `keyup` and `resize`. These events are, by apparition order, keyboard keys events, keyup and keydown,  and the window resize event.

And then, initialize some class internal attributes, we will go deeper in those attributes later, and we set the canvas size.

Finally, we initialize our future `Render` and the `PhysicEngine` services. The first one is the service to draw things to the screen, and the second one, will maintain some physic mechanic’s attributes to animate the game objects.

The `Game#run()` is called by the `main.mjs` to initialize the first `Scene`, and then start updating things.

```javascript
run() {
  this.init()
  this.update()
}
```

_illustration 5 - Run the game !_

Then a first call to `update()` will start the game mechanics.

Now we know how to start, we need to understand what is this Scene class ?

# Some Scene

The `Scene` is a way for the `Game` where some behaviors are defined. Let’s explain this.

When you start the game, there is always a title screen, you have to click a button and then see the main game menu screen, where you have to choose to start the game, or see and modify some settings, or load a previous saved game. Finally, you click on the start entry, and go to the play screen.

All those defined parts of the game with specific behavior, specific context, are Scene.

The Scene is a class where all the step of your game, for a specific context are managed.

We will find the init, update and some specific event listeners to react on `keyup`, `keydown` events, and then define some processing.

The file scene.mjs contains the following code:

```javascript
class Scene{
    constructor(g){}
    add(o){}
    init(){}
    keyPressed(e){}
    keyReleased(e){}
    update(elapsed){}
    draw(render,elapsed,startTime){}
}
export {Scene};
```

_illustration 7 - The Scene class, to add some game screen._

The `constructor(g)` receives only one parameter, the parent `game` object the `Scene` instance belongs to. It also initialises the `objects` list of GameObject the Scene will support and manage.

```javascript
constructor(g){
    this.game = g;
    this.objects = []
}
```

_illustration 8 - Initialize a Scene_

The `add(o)` method is a helper to add a `GameObject` to the `Scene`.

```javascript
add(o){
  this.objects.push(o)
  this.objects.sort((o1,o2)=>{
    return o1.layer>o2.layer?1:-1
  })
  this.game.render.add(o)
}
```

_illustration 9 - Add a GameObject to the Scene_

The `GameObject` is added to the `objects` list and the objects list is sorted regarding the `GameObject.layer` attribute.
This particular attribute will be used by the Render service to draw the object on the right depth level.

And then, the object is added to the render pipeline.
The following event listener are needed to process `keyup` and `keydown`:

```javascript
keyPressed(e){ }
keyReleased(e){ }
```

_illustration 10 - Proceed with keyboard events._

You will be able to process keyboard key pressed and released, and manage actions on your `Scene` objects.
The update method is where objects of your scene will be modified in their behaviors.

```javascript
update(elapsed){ }
```

_illustration 11 - the update for this scene._

And the last but clearly the not least, the draw method, where scene’s objects are rendered to the screen of your web browser.

```javascript
draw(render,elapsed,startTime){
  render.draw(elapsed,startTime)
}
```

_illustration 12 - Draw all the scene’s objects_

The rendering process, as we already talk a little bit before, is delegated to the Render class game’s instance.

The render parameter is this instance, elapsed and startTime are some time values that can help in certain complexe rendering cases to compute time based drawings.

Now that we know all about the Scene, we must go and dive into the GameObject.

## A GameObject to play with

The `GameObject`, is an object for the game (sic). This component is for example a sprite, a displayed text, bullet, a bouncing ball, a map, so, you understand, all this kind of visual things.

The `Scene` and the `Render` class are the host for this object.
But let’s analyze this class, see the `gameobject.mjs`:

```javascript
class GameObject {
  constructor(name,p,v,s) {
    this.name=name
    this.position = p
    this.size = s
    this.velocity = v
    this.acceleration = {x:0,y:0}
    this.color='red'
    this.isConstrainedToWindow = true
    this.layer=1
    this.priority=1

    this.properties = {
      elasticity: 1.0,
      rugosity: 1.0,
      mass:1.0
    }
    this.contact=false;
  }
  draw(c) {
    c.save()
    c.beginPath()
    c.arc(this.position.x, this.position.y, 
      this.size.width, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }
  update(elapsed) {
  }
}
export {GameObject};
```

_illustration 13 - The GameObject, the heart of our game._

In the `constructor(name, p, v, s)` all the `GameObject` attributes are initialized with method parameters values or with default values.

A traditional `name`, a key to find an object in the rendering pipeline or in the scene, `p` is a 2D vector position, `v` is a 2D vector for velocity, and `s` is a 2D vector  to define the `GameObject` size.

the other attributes are speakitself:

```javascript
    this.color='red'
```

The next ones are for rendering pipeline in the `Render` class:

```javascript
    this.layer=1
    this.priority=1
```

The properties are the physic engine’s attributes for the `GameObject`, the `acceleration`, and some special characteristics about the `elasticity`, `rugosity` and `mass`.

```javascript
    this.acceleration = {x:0,y:0}
    this.properties = {
      elasticity: 1.0,
      rugosity: 1.0,
      mass:1.0
    }
```

The last ones are for collision management.

```javascript
    this.contact=false;
    this.isConstrainedToWindow = true
```

These attributes will be also used for `PhysicsEngine` mechanics computation and collision reaction.

# Rendering all of them

The draw of the `objects` is delegated to the `Render` class. Let's have a look at this class.

```javascript
class Render {
    constructor(game, canvas) {
        this.game    = game
        this.canvas  = canvas
        this.ctx     = canvas.getContext("2d")
        this.objects = []
        this.layers  = []
        this.layersMap = new Map()
    }
    add(object) { }
    remove(object) { }
    removeAll(){ }
    clear(){ }
    draw(elapsed,startTime) { }
    drawDebugLineInfo(elapsed,startTime){ }
    drawPause(){ }
    resize(stageConfig){ }
}
export {Render}
```

_illustration 14 - The Render class_

First, as for any other class, we have a constructor initializing numerous attributes. one is very important, it is the canvas context, the API needed to draw anything on the canvas. As we are building a 2D game, we will play with the 2D version of the API.

```javascript
this.ctx     = canvas.getContext("2d")
```

Three others attributes are mandatory:

```javascript
this.objects = []
this.layers  = []
this.layersMap = new Map()
```

`objects` and `layers` are the rendering object pipeline.
