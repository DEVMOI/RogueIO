"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _canvas = _interopRequireDefault(require("./core/canvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var init = function init() {
  return {
    Canvas: _canvas["default"]
  };
};

var _default = init;
exports["default"] = _default;