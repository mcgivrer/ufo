# README

![](https://badgen.net/github/license/micromatch/micromatch "MIT license") 
![]()

## A Javascript Project

This sample code explain how implement basic classes to create minimal framework for a 2D game.

![Class diagram of the javascript game engine](https://planttext.com/api/plantuml/img/XLDDRuCm3BtpAn37JZrqnvmwf7MdgjNO7mY91PxI12Mc0rNxxqluA32DZaCil_Vy75jXxuXRgYyg4eex5x_n2zoYs7zFXAI0PMHH5z7tZ3_bdo1eK5N68Q7Hx0hYMVRO5PGHIEqSuqA00ij_QnLlmJBKDDXPD3QK1cHicffQIt-Br3H3ruP9K-SA-gnTP5-Bh5naKxVHEnEWnucr7suSk0EA08IHx_AFi9Ik9eQ6GCl1OQ2FeEjrDWCYx-qUrADpVa6fuLO-yAcuW2ElrXKlZi0Qb0S4zS3ehBW6EYWiIbfNlNi4x6rj9UUoTIXUTO7tHSv58SIRxNQmOROB4pmlPrMNz6IoIsBF9vkalmrpuNHBShSWetw8aTJ9xBqoqmKNzVVuHpH1Aq9Hef9_oNoOlLUMvwQ9zhwb_yT-0000)
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
