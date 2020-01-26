import Game from "./game";
import Sprite from "./sprite";
export default class Entity {
  constructor(tile, sprite, hp) {
    this.sprite = null;
    this.ctx = null;
    this.move(tile);
    this.spritesheet = sprite;
    this.hp = hp;
  }
  heal(damage) {
    this.hp = Math.min(Game.maxHp, this.hp + damage);
  }
  draw() {
    this.ctx = Game.canvas.getCtx();
    this.sprite = new Sprite(this.ctx, Game.tilesize);

    this.sprite.drawSprite(this.spritesheet, this.tile.x, this.tile.y);
    this.drawHp();
  }
  drawHp() {
    for (let i = 0; i < this.hp; i++) {
      this.sprite.drawSprite(
        9,
        this.tile.x + (i % 3) * (5 / 16),
        this.tile.y - Math.floor(i / 3) * (5 / 16)
      );
    }
  }
  tryMove(dx, dy) {
    let newTile = this.tile.getNeighbor(dx, dy);
    console.log(newTile);
    if (newTile.passable) {
      if (!newTile.monster) {
        this.move(newTile);
      } else {
        if (this.isPlayer != newTile.monster.isPlayer) {
          this.attackedThisTurn = true;
          newTile.monster.stunned = true;
          newTile.monster.hit(1);
        }
      }
      return true;
    }
  }
  update() {
    if (this.stunned) {
      this.stunned = false;
      return;
    }
    this.doStuff();
  }

  doStuff() {
    let neighbors = this.tile.getAdjacentPassableNeighbors();

    neighbors = neighbors.filter(t => !t.monster || t.monster.isPlayer);

    if (neighbors.length) {
      neighbors.sort(
        (a, b) => a.dist(Game.player.tile) - b.dist(Game.player.tile)
      );
      let newTile = neighbors[0];
      this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);
    }
  }
  hit(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.dead = true;
    this.tile.monster = null;
    this.spritesheet = 1;
  }

  move(tile) {
    if (this.tile) {
      this.tile.monster = null;
    }
    this.tile = tile;
    tile.monster = this;
  }
}
