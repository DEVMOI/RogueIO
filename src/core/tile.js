import Game from "./game";
import SpriteSheet from "./spritesheet";
import util from "./util";
export default class Tile {
  constructor(x, y, sprite, passable) {
    this.ctx = null;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.passable = passable;
  }
  replace(newTileType) {
    Game.map.tiles[this.x][this.y] = new newTileType(this.x, this.y);
    return Game.map.tiles[this.x][this.y];
  }
  //manhattan distance
  dist(other) {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }

  getNeighbor(dx, dy) {
    return Game.map.getTile(this.x + dx, this.y + dy);
  }

  getAdjacentNeighbors() {
    return util.shuffle([
      this.getNeighbor(0, -1),
      this.getNeighbor(0, 1),
      this.getNeighbor(-1, 0),
      this.getNeighbor(1, 0)
    ]);
  }

  getAdjacentPassableNeighbors() {
    return this.getAdjacentNeighbors().filter(t => t.passable);
  }

  getConnectedTiles() {
    let connectedTiles = [this];
    let frontier = [this];
    while (frontier.length) {
      let neighbors = frontier
        .pop()
        .getAdjacentPassableNeighbors()
        .filter(t => !connectedTiles.includes(t));
      connectedTiles = connectedTiles.concat(neighbors);
      frontier = frontier.concat(neighbors);
    }
    return connectedTiles;
  }
  draw() {
    this.ctx = Game.canvas.getCtx();
    let spriteSheet = new SpriteSheet({
      ctx: this.ctx,
      tilesize: Game.tilesize
    });
    spriteSheet.drawSprite(this.sprite, this.x, this.y);
    console.log(this.sprite)
    if (this.treasure) {
      spriteSheet.drawSprite(12, this.x, this.y);
    }
  }
}
