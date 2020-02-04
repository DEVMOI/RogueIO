"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _arena = _interopRequireDefault(require("./arena.js"));

var _uniform = _interopRequireDefault(require("./uniform.js"));

var _cellular = _interopRequireDefault(require("./cellular.js"));

var _digger = _interopRequireDefault(require("./digger.js"));

var _ellermaze = _interopRequireDefault(require("./ellermaze.js"));

var _dividedmaze = _interopRequireDefault(require("./dividedmaze.js"));

var _iceymaze = _interopRequireDefault(require("./iceymaze.js"));

var _rogue = _interopRequireDefault(require("./rogue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Arena: _arena["default"],
  Uniform: _uniform["default"],
  Cellular: _cellular["default"],
  Digger: _digger["default"],
  EllerMaze: _ellermaze["default"],
  DividedMaze: _dividedmaze["default"],
  IceyMaze: _iceymaze["default"],
  Rogue: _rogue["default"]
};
exports["default"] = _default;