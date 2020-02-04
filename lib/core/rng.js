"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
var FRAC = 2.3283064365386963e-10;
/* 2^-32 */

var RNG =
/*#__PURE__*/
function () {
  function RNG() {
    _classCallCheck(this, RNG);

    this._seed = 0;
    this._s0 = 0;
    this._s1 = 0;
    this._s2 = 0;
    this._c = 0;
  }

  _createClass(RNG, [{
    key: "getSeed",
    value: function getSeed() {
      return this._seed;
    }
    /**
     * Seed the number generator
     */

  }, {
    key: "setSeed",
    value: function setSeed(seed) {
      seed = seed < 1 ? 1 / seed : seed;
      this._seed = seed;
      this._s0 = (seed >>> 0) * FRAC;
      seed = seed * 69069 + 1 >>> 0;
      this._s1 = seed * FRAC;
      seed = seed * 69069 + 1 >>> 0;
      this._s2 = seed * FRAC;
      this._c = 1;
      return this;
    }
    /**
     * @returns Pseudorandom value [0,1), uniformly distributed
     */

  }, {
    key: "getUniform",
    value: function getUniform() {
      var t = 2091639 * this._s0 + this._c * FRAC;
      this._s0 = this._s1;
      this._s1 = this._s2;
      this._c = t | 0;
      this._s2 = t - this._c;
      return this._s2;
    }
    /**
     * @param lowerBound The lower end of the range to return a value from, inclusive
     * @param upperBound The upper end of the range to return a value from, inclusive
     * @returns Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
     */

  }, {
    key: "getUniformInt",
    value: function getUniformInt(lowerBound, upperBound) {
      var max = Math.max(lowerBound, upperBound);
      var min = Math.min(lowerBound, upperBound);
      return Math.floor(this.getUniform() * (max - min + 1)) + min;
    }
    /**
     * @param mean Mean value
     * @param stddev Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
     * @returns A normally distributed pseudorandom value
     */

  }, {
    key: "getNormal",
    value: function getNormal() {
      var mean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var stddev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var u, v, r;

      do {
        u = 2 * this.getUniform() - 1;
        v = 2 * this.getUniform() - 1;
        r = u * u + v * v;
      } while (r > 1 || r == 0);

      var gauss = u * Math.sqrt(-2 * Math.log(r) / r);
      return mean + gauss * stddev;
    }
    /**
     * @returns Pseudorandom value [1,100] inclusive, uniformly distributed
     */

  }, {
    key: "getPercentage",
    value: function getPercentage() {
      return 1 + Math.floor(this.getUniform() * 100);
    }
    /**
     * @returns Randomly picked item, null when length=0
     */

  }, {
    key: "getItem",
    value: function getItem(array) {
      if (!array.length) {
        return null;
      }

      return array[Math.floor(this.getUniform() * array.length)];
    }
    /**
     * @returns New array with randomized items
     */

  }, {
    key: "shuffle",
    value: function shuffle(array) {
      var result = [];
      var clone = array.slice();

      while (clone.length) {
        var index = clone.indexOf(this.getItem(clone));
        result.push(clone.splice(index, 1)[0]);
      }

      return result;
    }
    /**
     * @param data key=whatever, value=weight (relative probability)
     * @returns whatever
     */

  }, {
    key: "getWeightedValue",
    value: function getWeightedValue(data) {
      var total = 0;

      for (var _id in data) {
        total += data[_id];
      }

      var random = this.getUniform() * total;
      var id,
          part = 0;

      for (id in data) {
        part += data[id];

        if (random < part) {
          return id;
        }
      } // If by some floating-point annoyance we have
      // random >= total, just return the last id.


      return id;
    }
    /**
     * Get RNG state. Useful for storing the state and re-setting it via setState.
     * @returns Internal state
     */

  }, {
    key: "getState",
    value: function getState() {
      return [this._s0, this._s1, this._s2, this._c];
    }
    /**
     * Set a previously retrieved state.
     */

  }, {
    key: "setState",
    value: function setState(state) {
      this._s0 = state[0];
      this._s1 = state[1];
      this._s2 = state[2];
      this._c = state[3];
      return this;
    }
    /**
     * Returns a cloned RNG
     */

  }, {
    key: "clone",
    value: function clone() {
      var clone = new RNG();
      return clone.setState(this.getState());
    }
  }]);

  return RNG;
}();

var _default = new RNG().setSeed(Date.now());

exports["default"] = _default;