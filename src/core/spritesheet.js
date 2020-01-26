import Game from "./game";
export default class SpriteSheet {
  constructor({ ctx, tilesize, spriteSheet }) {
    this.tilesize = tilesize;
    this.spriteSheet = spriteSheet;
    this.ctx = ctx;
  }

  drawSprite(sprites, x, y) {
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
