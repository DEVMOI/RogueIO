"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _game = _interopRequireDefault(require("./game"));

var _wall = _interopRequireDefault(require("./wall"));

var _floor = _interopRequireDefault(require("./floor"));

var _exit = _interopRequireDefault(require("./exit"));

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Map =
/*#__PURE__*/
function () {
  function Map(numTiles) {
    _classCallCheck(this, Map);

    this.numTiles = numTiles;
    this.tiles = [];
    this.monsters = null;
    this.treasure = null;
  }

  _createClass(Map, [{
    key: "generateLevel",
    value: function generateLevel() {
      var _this = this;

      _util["default"].tryTo("generate map", function () {
        return _this.generateTiles() == _this.randomPassableTile().getConnectedTiles().length;
      });

      this.generateMonsters();

      for (var i = 0; i < 3; i++) {
        this.randomPassableTile().treasure = true;
      }
    }
  }, {
    key: "generateTiles",
    value: function generateTiles() {
      var passableTiles = 0;

      for (var i = 0; i < this.numTiles; i++) {
        this.tiles[i] = [];

        for (var j = 0; j < this.numTiles; j++) {
          if (Math.random() < 0.3 || !this.inBounds(i, j)) {
            this.tiles[i][j] = new _wall["default"](i, j);
          } else {
            this.tiles[i][j] = new _floor["default"](i, j);
            passableTiles++;
          }
        }
      }

      return passableTiles;
    }
  }, {
    key: "inBounds",
    value: function inBounds(x, y) {
      return x > 0 && y > 0 && x < this.numTiles - 1 && y < this.numTiles - 1;
    }
  }, {
    key: "getTile",
    value: function getTile(x, y) {
      if (this.inBounds(x, y)) {
        return this.tiles[x][y];
      } else {
        return new _wall["default"](x, y);
      }
    }
  }, {
    key: "randomPassableTile",
    value: function randomPassableTile() {
      var _this2 = this;

      var tile;

      _util["default"].tryTo("get random tile", function () {
        var x = _util["default"].randomRange(0, _this2.numTiles - 1);

        var y = _util["default"].randomRange(0, _this2.numTiles - 1);

        tile = _this2.getTile(x, y);
        return tile.passable && !tile.monster;
      });

      return tile;
    }
  }, {
    key: "generateMonsters",
    value: function generateMonsters() {
      this.monsters = [];
      var numMonsters = _game["default"].level + 1;

      for (var i = 0; i < numMonsters; i++) {
        this.spawnMonster();
      }
    }
  }, {
    key: "spawnMonster",
    value: function spawnMonster() {
      var monsterType = _util["default"].shuffle(_game["default"].monsterClasses)[0];

      var monster = new monsterType(this.randomPassableTile());
      this.monsters.push(monster);
    }
  }]);

  return Map;
}();

exports["default"] = Map;