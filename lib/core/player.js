"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assetmanager = require("./assetmanager");

var _game = _interopRequireDefault(require("./game"));

var _entity = _interopRequireDefault(require("./entity"));

var _actions = _interopRequireDefault(require("../../Examples/Actions/actions"));

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Player =
/*#__PURE__*/
function (_Entity) {
  _inherits(Player, _Entity);

  function Player(tile) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, tile, 0, 3));
    _this.isPlayer = true;
    _this.teleportCounter = 0;
    _this.actions = _util["default"].shuffle(Object.keys(_actions["default"])).splice(0, _game["default"].numActions);
    return _this;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      this.shield--;
    }
  }, {
    key: "tryMove",
    value: function tryMove(dx, dy) {
      if (_get(_getPrototypeOf(Player.prototype), "tryMove", this).call(this, dx, dy)) {
        _game["default"].tick();
      }
    }
  }, {
    key: "addAction",
    value: function addAction() {
      var newAction = _util["default"].shuffle(Object.keys(_actions["default"]))[0];

      this.actions.push(newAction);
    } // TODO Fix perform actions

  }, {
    key: "performAction",
    value: function performAction(index) {
      var actionName = this.actions[index];

      if (actionName) {
        delete this.actions[index];

        _actions["default"][actionName]();

        (0, _assetmanager.playSound)("spell");

        _game["default"].tick();
      }
    }
  }]);

  return Player;
}(_entity["default"]);

exports["default"] = Player;