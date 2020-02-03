// // import init from "./lib";
import Options from "./src/core/options";
import RogueJS from "./src";
let { init } = RogueJS;
// const { setOptions } = Game;
// const { callback } = EventManager;
// import { Blob, Ent, Golem, MerQueen, Raptor } from "./Examples";

// // Game.numTiles = 7;
// let arr = [Blob, Raptor, Golem, Ent, MerQueen];
let options = {
  level: 1,
  numLevels: 6,
  score: 0,
  startingHp: 3,
  maxHp: 6,

  shakeAmount: 0,
  shakeX: 0,
  shakeY: 0,

  spawnRate: null,
  spawnCounter: null,

  spriteSheet: null,
  tileSet: "moiboi.png",

  tilesize: 64,
  numTiles: 9,
  uiWidth: 4,

  canvas: null,
  ctx: null,
  map: null,
  sprite: null,
  startingTile: null,
  player: null,
  playerClass: null,
  monsterClasses: [],
  // Combat Options
  numActions: 9
};

// Game.init();
// console.log(game.options);
console.log(Options);
let { canvas, context } = init();
canvas.height = 500;
