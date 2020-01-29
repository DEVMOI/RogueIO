import Game from "./game";
import SpriteSheet from "./spritesheet";
import util from "./util";
export default class Tile {
  constructor(x, y, spritesheet, passable) {
    this.ctx = null;
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
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
    let sprite = new SpriteSheet({ ctx: this.ctx, tilesize: Game.tilesize });
    sprite.drawSprite(this.spritesheet, this.x, this.y);
    if (this.treasure) {
      sprite.drawSprite(12, this.x, this.y);
    }   

  }
}
