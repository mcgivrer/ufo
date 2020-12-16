# README

## A Javascript Project

This sample code explain how implement basic classes to create minimal framework for a 2D game.

![Class diagram of the javascript game engine](https://www.planttext.com/api/plantuml/img/XP5D3i8W48Ntd8AmhEcYMrQDqRZKs1CWdRGO2WsCniPuTsdfxyB80kRDD_Fo4dAFmk6ZqKHguJqzYGRUX8QpGuKQU85EcOfyLlnykuF4SQgrNg6o9gedQ2iLTb49AK634mEV70e91iRw08qTD8KNWYctz1ewu4PngJklvD5KQkPxeVMyk0GZfAzfagQZ0tVHQ6wllNWxY0XPncZWB64n2FVzxRSmsq0Iyq_Gi5KIReV7avZZpz3I-Z4eQwLBaWUly5zV)
_fig. 1 - A Good Class diagram is better than any word ;)_

## Build

To build this sample:

```shell
$> npm build
```

## Run

1. run the project into a dev server with interactive reload:

```shell
$> npm run dev
```

2. just open your favorite web browser on the index.html file, and enjoy

```shell
$> firefox http://localhost:1234
```

3. Right now, only some basic tests for the internal framework/engine are possible:

- <kbd>Up</kbd>,<kbd>Down</kbd>,<kbd>Left</kbd>,<kbd>Right</kbd> to move the Player object (rectangle),
- <kbd>D</kbd> debug mode from 0, nodebug to 6 max level debug visual info (default set to 2),
- <kbd>PageUp</kbd> add 10 balls to the display,
- <kbd>PageDown</kbd> remove 10 balls from the display,
- <kbd>Backspace</kbd> remove all objects but player,
- <kbd>R</kbd> reset all displayed ball to a random position with random velocity and phyusic attributes (mass, friction, elasticity).

That's All

McG.
