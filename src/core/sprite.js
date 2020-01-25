import Canvas from "./canvas";
export default class Sprite {
  constructor(ctx, tilesize) {
    this.tilesize = tilesize;
    this.spriteSheet = null;
    this.ctx = ctx;
  }
  drawSprite(sprites, x, y) {
    // console.log(this.ctx);
    if (this.ctx !== undefined) {
      this.spriteSheet = new Image();
      this.spriteSheet.src = "moiboi.png";

      this.ctx.drawImage(
        this.spriteSheet,
        sprites * 16,
        0,
        16,
        16,
        x * this.tilesize,
        y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    }
  }
}
