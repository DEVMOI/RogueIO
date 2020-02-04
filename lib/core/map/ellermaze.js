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
 * Join lists with "i" and "i+1"
 */
function addToList(i, L, R) {
  R[L[i + 1]] = R[i];
  L[R[i]] = L[i + 1];
  R[i] = i + 1;
  L[i + 1] = i;
}
/**
 * Remove "i" from its list
 */


function removeFromList(i, L, R) {
  R[L[i]] = R[i];
  L[R[i]] = L[i];
  R[i] = i;
  L[i] = i;
}
/**
 * Maze generator - Eller's algorithm
 * See http://homepages.cwi.nl/~tromp/maze.html for explanation
 */


var EllerMaze =
/*#__PURE__*/
function (_Map) {
  _inherits(EllerMaze, _Map);

  function EllerMaze() {
    _classCallCheck(this, EllerMaze);

    return _possibleConstructorReturn(this, _getPrototypeOf(EllerMaze).apply(this, arguments));
  }

  _createClass(EllerMaze, [{
    key: "create",
    value: function create(callback) {
      var map = this._fillMap(1);

      var w = Math.ceil((this._width - 2) / 2);
      var rand = 9 / 24;
      var L = [];
      var R = [];

      for (var i = 0; i < w; i++) {
        L.push(i);
        R.push(i);
      }

      L.push(w - 1);
      /* fake stop-block at the right side */

      var j;

      for (j = 1; j + 3 < this._height; j += 2) {
        /* one row */
        for (var _i = 0; _i < w; _i++) {
          /* cell coords (will be always empty) */
          var x = 2 * _i + 1;
          var y = j;
          map[x][y] = 0;
          /* right connection */

          if (_i != L[_i + 1] && _rng["default"].getUniform() > rand) {
            addToList(_i, L, R);
            map[x + 1][y] = 0;
          }
          /* bottom connection */


          if (_i != L[_i] && _rng["default"].getUniform() > rand) {
            /* remove connection */
            removeFromList(_i, L, R);
          } else {
            /* create connection */
            map[x][y + 1] = 0;
          }
        }
      }
      /* last row */


      for (var _i2 = 0; _i2 < w; _i2++) {
        /* cell coords (will be always empty) */
        var _x = 2 * _i2 + 1;

        var _y = j;
        map[_x][_y] = 0;
        /* right connection */

        if (_i2 != L[_i2 + 1] && (_i2 == L[_i2] || _rng["default"].getUniform() > rand)) {
          /* dig right also if the cell is separated, so it gets connected to the rest of maze */
          addToList(_i2, L, R);
          map[_x + 1][_y] = 0;
        }

        removeFromList(_i2, L, R);
      }

      for (var _i3 = 0; _i3 < this._width; _i3++) {
        for (var _j = 0; _j < this._height; _j++) {
          callback(_i3, _j, map[_i3][_j]);
        }
      }

      return this;
    }
  }]);

  return EllerMaze;
}(_map["default"]);

exports["default"] = EllerMaze;