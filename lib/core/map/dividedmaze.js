"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _map = _interopRequireDefault(require("./map.js"));

var _rng = _interopRequireDefault(require("../rng.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
 * @augments ROT.Map
 */
var DividedMaze =
/*#__PURE__*/
function (_Map) {
  _inherits(DividedMaze, _Map);

  function DividedMaze() {
    var _this;

    _classCallCheck(this, DividedMaze);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DividedMaze).apply(this, arguments));
    _this._stack = [];
    _this._map = [];
    return _this;
  }

  _createClass(DividedMaze, [{
    key: "create",
    value: function create(callback) {
      var w = this._width;
      var h = this._height;
      this._map = [];

      for (var i = 0; i < w; i++) {
        this._map.push([]);

        for (var j = 0; j < h; j++) {
          var border = i == 0 || j == 0 || i + 1 == w || j + 1 == h;

          this._map[i].push(border ? 1 : 0);
        }
      }

      this._stack = [[1, 1, w - 2, h - 2]];

      this._process();

      for (var _i = 0; _i < w; _i++) {
        for (var _j = 0; _j < h; _j++) {
          callback(_i, _j, this._map[_i][_j]);
        }
      }

      this._map = [];
      return this;
    }
  }, {
    key: "_process",
    value: function _process() {
      while (this._stack.length) {
        var room = this._stack.shift();
        /* [left, top, right, bottom] */


        this._partitionRoom(room);
      }
    }
  }, {
    key: "_partitionRoom",
    value: function _partitionRoom(room) {
      var availX = [];
      var availY = [];

      for (var i = room[0] + 1; i < room[2]; i++) {
        var top = this._map[i][room[1] - 1];
        var bottom = this._map[i][room[3] + 1];

        if (top && bottom && !(i % 2)) {
          availX.push(i);
        }
      }

      for (var j = room[1] + 1; j < room[3]; j++) {
        var left = this._map[room[0] - 1][j];
        var right = this._map[room[2] + 1][j];

        if (left && right && !(j % 2)) {
          availY.push(j);
        }
      }

      if (!availX.length || !availY.length) {
        return;
      }

      var x = _rng["default"].getItem(availX);

      var y = _rng["default"].getItem(availY);

      this._map[x][y] = 1;
      var walls = [];
      var w = [];
      walls.push(w);
      /* left part */

      for (var _i2 = room[0]; _i2 < x; _i2++) {
        this._map[_i2][y] = 1;
        if (_i2 % 2) w.push([_i2, y]);
      }

      w = [];
      walls.push(w);
      /* right part */

      for (var _i3 = x + 1; _i3 <= room[2]; _i3++) {
        this._map[_i3][y] = 1;
        if (_i3 % 2) w.push([_i3, y]);
      }

      w = [];
      walls.push(w);
      /* top part */

      for (var _j2 = room[1]; _j2 < y; _j2++) {
        this._map[x][_j2] = 1;
        if (_j2 % 2) w.push([x, _j2]);
      }

      w = [];
      walls.push(w);
      /* bottom part */

      for (var _j3 = y + 1; _j3 <= room[3]; _j3++) {
        this._map[x][_j3] = 1;
        if (_j3 % 2) w.push([x, _j3]);
      }

      var solid = _rng["default"].getItem(walls);

      for (var _i4 = 0; _i4 < walls.length; _i4++) {
        var _w = walls[_i4];

        if (_w == solid) {
          continue;
        }

        var hole = _rng["default"].getItem(_w);

        this._map[hole[0]][hole[1]] = 0;
      }

      this._stack.push([room[0], room[1], x - 1, y - 1]);
      /* left top */


      this._stack.push([x + 1, room[1], room[2], y - 1]);
      /* right top */


      this._stack.push([room[0], y + 1, x - 1, room[3]]);
      /* left bottom */


      this._stack.push([x + 1, y + 1, room[2], room[3]]);
      /* right bottom */

    }
  }]);

  return DividedMaze;
}(_map["default"]);

exports["default"] = DividedMaze;