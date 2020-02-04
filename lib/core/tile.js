"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _game = _interopRequireDefault(require("./game"));

var _spritesheet = _interopRequireDefault(require("./spritesheet"));

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tile =
/*#__PURE__*/
function () {
  function Tile(x, y, sprite, passable) {
    _classCallCheck(this, Tile);

    this.ctx = null;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.passable = passable;
  }

  _createClass(Tile, [{
    key: "replace",
    value: function replace(newTileType) {
      _game["default"].map.tiles[this.x][this.y] = new newTileType(this.x, this.y);
      return _game["default"].map.tiles[this.x][this.y];
    } //manhattan distance

  }, {
    key: "dist",
    value: function dist(other) {
      return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }
  }, {
    key: "getNeighbor",
    value: function getNeighbor(dx, dy) {
      return _game["default"].map.getTile(this.x + dx, this.y + dy);
    }
  }, {
    key: "getAdjacentNeighbors",
    value: function getAdjacentNeighbors() {
      return _util["default"].shuffle([this.getNeighbor(0, -1), this.getNeighbor(0, 1), this.getNeighbor(-1, 0), this.getNeighbor(1, 0)]);
    }
  }, {
    key: "getAdjacentPassableNeighbors",
    value: function getAdjacentPassableNeighbors() {
      return this.getAdjacentNeighbors().filter(function (t) {
        return t.passable;
      });
    }
  }, {
    key: "getConnectedTiles",
    value: function getConnectedTiles() {
      var connectedTiles = [this];
      var frontier = [this];

      while (frontier.length) {
        var neighbors = frontier.pop().getAdjacentPassableNeighbors().filter(function (t) {
          return !connectedTiles.includes(t);
        });
        connectedTiles = connectedTiles.concat(neighbors);
        frontier = frontier.concat(neighbors);
      }

      return connectedTiles;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx = _game["default"].canvas.getCtx();
      var spriteSheet = new _spritesheet["default"]({
        ctx: this.ctx,
        tilesize: _game["default"].tilesize
      });
      spriteSheet.drawSprite(this.sprite, this.x, this.y);

      if (this.treasure) {
        spriteSheet.drawSprite(12, this.x, this.y);
      }

      if (this.effectCounter) {
        this.effectCounter--;
        this.ctx.globalAlpha = this.effectCounter / 30;
        spriteSheet.drawSprite(this.effect, this.x, this.y);
        this.ctx.globalAlpha = 1;
      }
    }
  }, {
    key: "setEffect",
    value: function setEffect(effectSprite) {
      this.effect = effectSprite;
      this.effectCounter = 30;
    }
  }]);

  return Tile;
}();

exports["default"] = Tile;