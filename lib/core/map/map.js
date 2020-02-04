"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Map =
/*#__PURE__*/
function () {
  /**
   * @class Base map generator
   * @param {int} [width=ROT.DEFAULT_WIDTH]
   * @param {int} [height=ROT.DEFAULT_HEIGHT]
   */
  function Map() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.DEFAULT_WIDTH;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_HEIGHT;

    _classCallCheck(this, Map);

    this._width = width;
    this._height = height;
  }

  _createClass(Map, [{
    key: "create",
    value: function create(callback) {}
  }, {
    key: "_fillMap",
    value: function _fillMap(value) {
      var map = [];

      for (var i = 0; i < this._width; i++) {
        map.push([]);

        for (var j = 0; j < this._height; j++) {
          map[i].push(value);
        }
      }

      return map;
    }
  }]);

  return Map;
}();

exports["default"] = Map;