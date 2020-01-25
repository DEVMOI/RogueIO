// import init from "./lib";
import init from "./src";
const { Canvas, Sprite } = init();

let game = {
  x: 0,
  y: 0,
  spriteSheet: null,
  tilesize: 64,
  numTiles: 9,
  uiWidth: 4,
  canvas: null,
  ctx: null,

  init() {
    this.canvas = new Canvas({
      tilesize: this.tilesize,
      numTiles: this.numTiles,
      uiWidth: this.uiWidth
    });
    document.body.append(this.canvas.Display());
  },
  draw() {
    this.ctx = this.canvas.getCtx();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawSprite(0, this.x, this.y);
  },
  drawSprite(sprites, x, y) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = "moiboi.png";
    this.ctx = this.canvas.getCtx();
    
    this.ctx.drawImage(
      this.spriteSheet,
      sprites * 16,
      0,
      16,
      16,
      this.x * this.tilesize,
      this.y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  }
};
game.init();
setInterval(() => {
  game.draw();
}, 15);
game.drawSprite();