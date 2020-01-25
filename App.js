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
    let x = this.x;
    let y = this.y;
    this.canvas = new Canvas({
      tilesize: this.tilesize,
      numTiles: this.numTiles,
      uiWidth: this.uiWidth
    });
    window.addEventListener("keydown", this);
    document.body.append(this.canvas.Display());
  },
  handleEvent(e) {
    if (e.key == "w") this.y--;
    if (e.key == "s") this.y++;
    if (e.key == "a") this.x--;
    if (e.key == "d") this.x++;
    console.log("w", this.y);
  },
  draw() {
    this.ctx = this.canvas.getCtx();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawSprite(0, this.x, this.y);
  },
  drawSprite(sprites, x, y) {
    console.log(this.y);
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
