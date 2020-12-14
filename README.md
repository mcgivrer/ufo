# README

## A Javascript Project

This sample code explain how implement basic classes to create minimal framework for a 2D game.

```plantuml source="classmodel.uml" format="PNG"
@startuml
class Game{
    +title:String
}
class GameObject{
    +position
    +velocity
    +acceleration
}
class Scene
class DemoScene extends Scene
class Render
class PhysicEngine
Game *-- Render:render
Game *-- PhysicEngine:physic
Game "1" -- "*" Scene:scenes
Game "1" -- "1" Scene:scene
Scene "1" -- "n" GameObject:objects
Render "1" -- "n" GameObject:objects
GameObject "1" -- "n" GameObject:child
@enduml
```
_fig. 1 - A Good Class diagram is better than any word ;)_

To be added soon :

```plantuml
@startuml
class Ball extends GameObject
DemoScene "1" -- "n" Ball:objects
@enduml
```


## Build

To build this sample:

```shell
$> npm build
```

## Run

Two options:

1. just open your favorite web browser on the index.html file, and enjoy

```shell
$> firefox ./index.html
```

2. run the project into a dev server with interactive reload:

```shell
$> npm run dev
```

That's All

McG.
