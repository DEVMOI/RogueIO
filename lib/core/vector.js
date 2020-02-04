"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vectorFactory;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A simple 2d vector object.
 *
 * ```js
 * import { Vector } from 'kontra';
 *
 * let vector = Vector(100, 200);
 * ```
 * @class Vector
 *
 * @param {Number} [x=0] - X coordinate of the vector.
 * @param {Number} [y=0] - Y coordinate of the vector.
 */
var Vector =
/*#__PURE__*/
function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

    this._x = x;
    this._y = y;
  }
  /**
   * Return a new Vector whose value is the addition of the current Vector and the passed in Vector. If `dt` is provided, the result is multiplied by the value.
   * @memberof Vector
   * @function add
   *
   * @param {kontra.Vector} vector - Vector to add to the current Vector.
   * @param {Number} [dt=1] - Time since last update.
   *
   * @returns {kontra.Vector} A new kontra.Vector instance.
   */


  _createClass(Vector, [{
    key: "add",
    value: function add(vec) {
      var dt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return vectorFactory(this.x + (vec.x || 0) * dt, this.y + (vec.y || 0) * dt, this);
    }
    /**
     * Clamp the Vector between two points, preventing `x` and `y` from going below or above the minimum and maximum values. Perfect for keeping a sprite from going outside the game boundaries.
     *
     * ```js
     * import { Vector } from 'kontra';
     *
     * let vector = Vector(100, 200);
     * vector.clamp(0, 0, 200, 300);
     *
     * vector.x += 200;
     * console.log(vector.x);  //=> 200
     *
     * vector.y -= 300;
     * console.log(vector.y);  //=> 0
     *
     * vector.add({x: -500, y: 500});
     * console.log(vector);    //=> {x: 0, y: 300}
     * ```
     * @memberof Vector
     * @function clamp
     *
     * @param {Number} xMin - Minimum x value.
     * @param {Number} yMin - Minimum y value.
     * @param {Number} xMax - Maximum x value.
     * @param {Number} yMax - Maximum y value.
     */

  }, {
    key: "clamp",
    value: function clamp(xMin, yMin, xMax, yMax) {
      this._c = true;
      this._a = xMin;
      this._b = yMin;
      this._d = xMax;
      this._e = yMax;
    }
    /**
     * X coordinate of the vector.
     * @memberof Vector
     * @property {Number} x
     */

  }, {
    key: "x",
    get: function get() {
      return this._x;
    }
    /**
     * Y coordinate of the vector.
     * @memberof Vector
     * @property {Number} y
     */
    ,
    set: function set(value) {
      this._x = this._c ? Math.min(Math.max(this._a, value), this._d) : value;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = this._c ? Math.min(Math.max(this._b, value), this._e) : value;
    }
  }]);

  return Vector;
}();

function vectorFactory(x, y) {
  var vec = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var vector = new Vector(x, y); // preserve vector clamping when creating new vectors

  if (vec._c) {
    vector.clamp(vec._a, vec._b, vec._d, vec._e); // reset x and y so clamping takes effect

    vector.x = x;
    vector.y = y;
  }

  return vector;
}

vectorFactory.prototype = Vector.prototype;
vectorFactory["class"] = Vector;