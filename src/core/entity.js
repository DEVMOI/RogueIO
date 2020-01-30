import AssetManager from "./AssetManager";
import Game from "./game";
import SpriteSheet from "./spritesheet";
export default class Entity {
  constructor(tile, sprite, hp) {
    this.spritesheet = null;
    this.ctx = null;
    this.move(tile);
    this.sprite = sprite;
    this.hp = hp;
    this.teleportCounter = 2;
    this.offsetX = 0;
    this.offsetY = 0;
    this.lastMove = [-1, 0];
    this.bonusAttack = 0;
  }
  heal(damage) {
    this.hp = Math.min(Game.maxHp, this.hp + damage);
  }
  
  getDisplayX() {
    return this.tile.x + this.offsetX;
  }

  getDisplayY() {
    return this.tile.y + this.offsetY;
  }
  draw() {
    this.ctx = Game.canvas.getCtx();
    this.spritesheet = new SpriteSheet({
      ctx: this.ctx,
      tilesize: Game.tilesize
    });
    if (this.teleportCounter > 0) {
      this.spritesheet.drawSprite(10, this.getDisplayX(), this.getDisplayY());
    } else {
      this.spritesheet.drawSprite(
        this.sprite,
        this.getDisplayX(),
        this.getDisplayY()
      );
      this.drawHp();
    }
    this.offsetX -= Math.sign(this.offsetX) * (1 / 8);
    this.offsetY -= Math.sign(this.offsetY) * (1 / 8);
  }
  drawHp() {
    for (let i = 0; i < this.hp; i++) {
      this.spritesheet.drawSprite(
        9,
        this.getDisplayX() + (i % 3) * (5 / 16),
        this.getDisplayY() - Math.floor(i / 3) * (5 / 16)
      );
    }
  }
  tryMove(dx, dy) {
    let newTile = this.tile.getNeighbor(dx, dy);
    if (newTile.passable) {
      this.lastMove = [dx, dy];
      if (!newTile.monster) {
        this.move(newTile);
      } else {
        if (this.isPlayer != newTile.monster.isPlayer) {
          this.attackedThisTurn = true;
          newTile.monster.stunned = true;
          newTile.monster.hit(1 + this.bonusAttack);
          this.bonusAttack = 0;

          Game.shakeAmount = 5;

          this.offsetX = (newTile.x - this.tile.x) / 2;
          this.offsetY = (newTile.y - this.tile.y) / 2;
        }
      }
      return true;
    }
  }
  update() {
    this.teleportCounter--;
    if (this.stunned || this.teleportCounter > 0) {
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
    if (this.sheild > 0) {
    }
    this.hp -= damage;
    if (this.hp <= 0) {
      this.die();
    }

    if (this.isPlayer) {
      AssetManager.playSound("hit1");
    } else {
      AssetManager.playSound("hit2");
    }
  }

  die() {
    this.dead = true;
    this.tile.monster = null;
    this.sprite = 1;
  }

  move(tile) {
    if (this.tile) {
      this.tile.monster = null;
      this.offsetX = this.tile.x - tile.x;
      this.offsetY = this.tile.y - tile.y;
    }
    this.tile = tile;
    tile.monster = this;
    tile.stepOn(this);
  }
}
