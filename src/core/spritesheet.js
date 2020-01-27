import Game from "./game";
export default class SpriteSheet {
  constructor({ ctx, tilesize, tileSet }) {
    this.tilesize = tilesize;
    this.tileSet = tileSet;
    this.spriteSheet = null;
    this.ctx = ctx;
  }

  drawSprite(sprites, x, y) {
    if (this.ctx !== undefined) {
      this.spriteSheet = new Image();

      this.spriteSheet.src = Game.tileSet;
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
