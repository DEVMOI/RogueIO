import { game } from "../../App";
import Sprite from "./sprite";
export default class Tile {
  constructor(x, y, spritesheet, passable) {
    this.ctx = null;
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.passable = passable;
  }

  draw() {
    this.ctx = game.canvas.getCtx();
    let sprite = new Sprite(this.ctx, game.tilesize);
    console.log(this.ctx, game.tilesize);
    sprite.drawSprite(this.spritesheet, this.x, this.y);
  }
}
