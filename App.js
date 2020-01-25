// import init from "./lib";
import init from "./src";
import Tile from './src/core/tile';
const { Canvas, Sprite, Map } = init();

let game = {
  x: 0,
  y: 0,
  spriteSheet: null,
  tilesize: 64,
  numTiles: 9,
  uiWidth: 4,
  canvas: null,
  ctx: null,
  map: null,
  sprite: null,

  init() {
    this.canvas = new Canvas({
      tilesize: this.tilesize,
      numTiles: this.numTiles,
      uiWidth: this.uiWidth
    });

    window.addEventListener("keydown", this);
    document.body.append(this.canvas.Display());

    this.ctx = this.canvas.getCtx();
    this.tile = new Tile
    this.map = new Map(this.x, this.y, this.numTiles);

    this.map.generateLevel();
  },
  handleEvent(e) {
    if (e.key == "w") this.y--;
    if (e.key == "s") this.y++;
    if (e.key == "a") this.x--;
    if (e.key == "d") this.x++;
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
    // Draws Character
    this.sprite.drawSprite(0, this.x, this.y);
  }
};
game.init();
setInterval(() => {
  game.draw();
}, 15);
export { game };
