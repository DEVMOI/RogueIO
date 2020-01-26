import Canvas from "./canvas";
import Sprite from "./sprite";
import Map from "./map";
import Tile from "./tile";
import Player from "./player";
let Game = {
  x: 0,
  y: 0,
  level: 1,
  maxHp:6,
  spriteSheet: null,
  tilesize: 64,
  numTiles: 15,
  uiWidth: 4,
  canvas: null,
  ctx: null,
  map: null,
  sprite: null,
  startingTile: null,
  player: null,
  monsterClasses: [],

  init() {
    this.canvas = new Canvas({
      tilesize: this.tilesize,
      numTiles: this.numTiles,
      uiWidth: this.uiWidth
    });
    document.body.append(this.canvas.Display());
    this.ctx = this.canvas.getCtx();

    this.tile = new Tile();

    this.map = new Map(this.x, this.y, this.numTiles);

    this.map.generateLevel();

    this.player = new Player(this.map.randomPassableTile());

    window.addEventListener("keydown", this);
    this.gameLoop();
  },
  handleEvent(e) {
    if (e.key == "w") this.player.tryMove(0, -1);
    if (e.key == "s") this.player.tryMove(0, 1);
    if (e.key == "a") this.player.tryMove(-1, 0);
    if (e.key == "d") this.player.tryMove(1, 0);
  },
  gameLoop(interval = 15) {
    setInterval(() => {
      this.draw();
    }, interval);
  },
  draw() {
    this.ctx = this.canvas.getCtx();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sprite = new Sprite(this.ctx, this.tilesize);

    for (let i = 0; i < this.numTiles; i++) {
      for (let j = 0; j < this.numTiles; j++) {
        this.map.getTile(i, j).draw();
      }
    }
    for (let i = 0; i < this.map.monsters.length; i++) {
      this.map.monsters[i].draw();
    }

    // Draws Character
    this.player.draw();
  },
  tick() {
    for (let k = this.map.monsters.length - 1; k >= 0; k--) {
      if (!this.map.monsters[k].dead) {
        this.map.monsters[k].update();
      } else {
        this.map.monsters.splice(k, 1);
      }
    }
  },
  registerMonsters(arr) {
    this.monsterClasses = arr;
  }
};

export default Game;
