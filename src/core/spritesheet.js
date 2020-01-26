import Canvas from "./canvas";
export default class SpriteSheet {
  constructor({ ctx, tilesize, gameTitle, spriteSheet }) {
    this.tilesize = tilesize;
    this.spriteSheet = spriteSheet;
    this.ctx = ctx;
    this.gameTitle = gameTitle;
  }
  drawSprite(sprites, x, y) {
    // console.log(this.ctx);
    if (this.ctx !== undefined) {
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
