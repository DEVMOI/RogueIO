// import RogueJS from "./index.js";
import Options from "./src/core/options";
import RogueJS from "./src";
let { init, RNG, Map } = RogueJS;

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

console.log(Options);
console.log(RNG.getSeed());
let { canvas, context } = init();
canvas.height = 500;
var w = 40,
  h = 25;
var map = new Map.Digger(w, h);

for (var i = 0; i < 4; i++) {
  map.create(this);
}
