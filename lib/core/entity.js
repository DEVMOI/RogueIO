"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assetmanager = require("./assetmanager");

var _game = _interopRequireDefault(require("./game"));

var _spritesheet = _interopRequireDefault(require("./spritesheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Entity =
/*#__PURE__*/
function () {
  function Entity(tile, sprite, hp) {
    _classCallCheck(this, Entity);

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

  _createClass(Entity, [{
    key: "heal",
    value: function heal(damage) {
      this.hp = Math.min(_game["default"].maxHp, this.hp + damage);
    }
  }, {
    key: "getDisplayX",
    value: function getDisplayX() {
      return this.tile.x + this.offsetX;
    }
  }, {
    key: "getDisplayY",
    value: function getDisplayY() {
      return this.tile.y + this.offsetY;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx = _game["default"].canvas.getCtx();
      this.spritesheet = new _spritesheet["default"]({
        ctx: this.ctx,
        tilesize: _game["default"].tilesize
      });

      if (this.teleportCounter > 0) {
        this.spritesheet.drawSprite(10, this.getDisplayX(), this.getDisplayY());
      } else {
        this.spritesheet.drawSprite(this.sprite, this.getDisplayX(), this.getDisplayY());
        this.drawHp();
      }

      this.offsetX -= Math.sign(this.offsetX) * (1 / 8);
      this.offsetY -= Math.sign(this.offsetY) * (1 / 8);
    }
  }, {
    key: "drawHp",
    value: function drawHp() {
      for (var i = 0; i < this.hp; i++) {
        this.spritesheet.drawSprite(9, this.getDisplayX() + i % 3 * (5 / 16), this.getDisplayY() - Math.floor(i / 3) * (5 / 16));
      }
    }
  }, {
    key: "tryMove",
    value: function tryMove(dx, dy) {
      var newTile = this.tile.getNeighbor(dx, dy);

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
            _game["default"].shakeAmount = 5;
            this.offsetX = (newTile.x - this.tile.x) / 2;
            this.offsetY = (newTile.y - this.tile.y) / 2;
          }
        }

        return true;
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.teleportCounter--;

      if (this.stunned || this.teleportCounter > 0) {
        this.stunned = false;
        return;
      }

      this.doStuff();
    }
  }, {
    key: "doStuff",
    value: function doStuff() {
      var neighbors = this.tile.getAdjacentPassableNeighbors();
      neighbors = neighbors.filter(function (t) {
        return !t.monster || t.monster.isPlayer;
      });

      if (neighbors.length) {
        neighbors.sort(function (a, b) {
          return a.dist(_game["default"].player.tile) - b.dist(_game["default"].player.tile);
        });
        var newTile = neighbors[0];
        this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);
      }
    }
  }, {
    key: "hit",
    value: function hit(damage) {
      if (this.sheild > 0) {}

      this.hp -= damage;

      if (this.hp <= 0) {
        this.die();
      }

      if (this.isPlayer) {
        (0, _assetmanager.playSound)("hit1");
      } else {
        (0, _assetmanager.playSound)("hit2");
      }
    }
  }, {
    key: "die",
    value: function die() {
      this.dead = true;
      this.tile.monster = null;
      this.sprite = 1;
    }
  }, {
    key: "move",
    value: function move(tile) {
      if (this.tile) {
        this.tile.monster = null;
        this.offsetX = this.tile.x - tile.x;
        this.offsetY = this.tile.y - tile.y;
      }

      this.tile = tile;
      tile.monster = this;
      tile.stepOn(this);
    }
  }]);

  return Entity;
}();

exports["default"] = Entity;