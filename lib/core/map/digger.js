"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dungeon = _interopRequireDefault(require("./dungeon.js"));

var _features = require("./features.js");

var _rng = _interopRequireDefault(require("../rng.js"));

var _constants = require("../../constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FEATURES = {
  room: _features.Room,
  corridor: _features.Corridor
};
/**
 * Random dungeon generator using human-like digging patterns.
 * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at
 * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
 */

var Digger =
/*#__PURE__*/
function (_Dungeon) {
  _inherits(Digger, _Dungeon);

  function Digger(width, height) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Digger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Digger).call(this, width, height));
    _this._options = Object.assign({
      roomWidth: [3, 9],
      roomHeight: [3, 5],
      corridorLength: [3, 10],
      dugPercentage: 0.2,
      timeLimit: 1000
      /* we stop after this much time has passed (msec) */

    }, options);
    _this._features = {
      room: 4,
      corridor: 4
    };
    _this._map = [];
    _this._featureAttempts = 20;
    /* how many times do we try to create a feature on a suitable wall */

    _this._walls = {};
    /* these are available for digging */

    _this._dug = 0;
    _this._digCallback = _this._digCallback.bind(_assertThisInitialized(_this));
    _this._canBeDugCallback = _this._canBeDugCallback.bind(_assertThisInitialized(_this));
    _this._isWallCallback = _this._isWallCallback.bind(_assertThisInitialized(_this));
    _this._priorityWallCallback = _this._priorityWallCallback.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Digger, [{
    key: "create",
    value: function create(callback) {
      this._rooms = [];
      this._corridors = [];
      this._map = this._fillMap(1);
      this._walls = {};
      this._dug = 0;
      var area = (this._width - 2) * (this._height - 2);

      this._firstRoom();

      var t1 = Date.now();
      var priorityWalls;

      do {
        priorityWalls = 0;
        var t2 = Date.now();

        if (t2 - t1 > this._options.timeLimit) {
          break;
        }
        /* find a good wall */


        var wall = this._findWall();

        if (!wall) {
          break;
        }
        /* no more walls */


        var parts = wall.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);

        var dir = this._getDiggingDirection(x, y);

        if (!dir) {
          continue;
        }
        /* this wall is not suitable */
        //      console.log("wall", x, y);

        /* try adding a feature */


        var featureAttempts = 0;

        do {
          featureAttempts++;

          if (this._tryFeature(x, y, dir[0], dir[1])) {
            /* feature added */
            //if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
            this._removeSurroundingWalls(x, y);

            this._removeSurroundingWalls(x - dir[0], y - dir[1]);

            break;
          }
        } while (featureAttempts < this._featureAttempts);

        for (var id in this._walls) {
          if (this._walls[id] > 1) {
            priorityWalls++;
          }
        }
      } while (this._dug / area < this._options.dugPercentage || priorityWalls);
      /* fixme number of priority walls */


      this._addDoors();

      if (callback) {
        for (var i = 0; i < this._width; i++) {
          for (var j = 0; j < this._height; j++) {
            callback(i, j, this._map[i][j]);
          }
        }
      }

      this._walls = {};
      this._map = [];
      return this;
    }
  }, {
    key: "_digCallback",
    value: function _digCallback(x, y, value) {
      if (value == 0 || value == 2) {
        /* empty */
        this._map[x][y] = 0;
        this._dug++;
      } else {
        /* wall */
        this._walls[x + "," + y] = 1;
      }
    }
  }, {
    key: "_isWallCallback",
    value: function _isWallCallback(x, y) {
      if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
        return false;
      }

      return this._map[x][y] == 1;
    }
  }, {
    key: "_canBeDugCallback",
    value: function _canBeDugCallback(x, y) {
      if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
        return false;
      }

      return this._map[x][y] == 1;
    }
  }, {
    key: "_priorityWallCallback",
    value: function _priorityWallCallback(x, y) {
      this._walls[x + "," + y] = 2;
    }
  }, {
    key: "_firstRoom",
    value: function _firstRoom() {
      var cx = Math.floor(this._width / 2);
      var cy = Math.floor(this._height / 2);

      var room = _features.Room.createRandomCenter(cx, cy, this._options);

      this._rooms.push(room);

      room.create(this._digCallback);
    }
    /**
     * Get a suitable wall
     */

  }, {
    key: "_findWall",
    value: function _findWall() {
      var prio1 = [];
      var prio2 = [];

      for (var _id in this._walls) {
        var prio = this._walls[_id];

        if (prio == 2) {
          prio2.push(_id);
        } else {
          prio1.push(_id);
        }
      }

      var arr = prio2.length ? prio2 : prio1;

      if (!arr.length) {
        return null;
      }
      /* no walls :/ */


      var id = _rng["default"].getItem(arr.sort()); // sort to make the order deterministic


      delete this._walls[id];
      return id;
    }
    /**
     * Tries adding a feature
     * @returns {bool} was this a successful try?
     */

  }, {
    key: "_tryFeature",
    value: function _tryFeature(x, y, dx, dy) {
      var featureName = _rng["default"].getWeightedValue(this._features);

      var ctor = FEATURES[featureName];
      var feature = ctor.createRandomAt(x, y, dx, dy, this._options);

      if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
        //      console.log("not valid");
        //      feature.debug();
        return false;
      }

      feature.create(this._digCallback); //  feature.debug();

      if (feature instanceof _features.Room) {
        this._rooms.push(feature);
      }

      if (feature instanceof _features.Corridor) {
        feature.createPriorityWalls(this._priorityWallCallback);

        this._corridors.push(feature);
      }

      return true;
    }
  }, {
    key: "_removeSurroundingWalls",
    value: function _removeSurroundingWalls(cx, cy) {
      var deltas = _constants.DIRS[4];

      for (var i = 0; i < deltas.length; i++) {
        var delta = deltas[i];
        var x = cx + delta[0];
        var y = cy + delta[1];
        delete this._walls[x + "," + y];
        x = cx + 2 * delta[0];
        y = cy + 2 * delta[1];
        delete this._walls[x + "," + y];
      }
    }
    /**
     * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
     */

  }, {
    key: "_getDiggingDirection",
    value: function _getDiggingDirection(cx, cy) {
      if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) {
        return null;
      }

      var result = null;
      var deltas = _constants.DIRS[4];

      for (var i = 0; i < deltas.length; i++) {
        var delta = deltas[i];
        var x = cx + delta[0];
        var y = cy + delta[1];

        if (!this._map[x][y]) {
          /* there already is another empty neighbor! */
          if (result) {
            return null;
          }

          result = delta;
        }
      }
      /* no empty neighbor */


      if (!result) {
        return null;
      }

      return [-result[0], -result[1]];
    }
    /**
     * Find empty spaces surrounding rooms, and apply doors.
     */

  }, {
    key: "_addDoors",
    value: function _addDoors() {
      var data = this._map;

      function isWallCallback(x, y) {
        return data[x][y] == 1;
      }

      for (var i = 0; i < this._rooms.length; i++) {
        var room = this._rooms[i];
        room.clearDoors();
        room.addDoors(isWallCallback);
      }
    }
  }]);

  return Digger;
}(_dungeon["default"]);

exports["default"] = Digger;