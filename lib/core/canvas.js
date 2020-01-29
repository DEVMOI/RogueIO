"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(x, y, color, context) {
    _classCallCheck(this, Canvas);

    this._x = x || "512";
    this._y = y || 256;
    this.color = color || "#000";
    this.context = context || "2d";
    this.canvas = null;
  }

  _createClass(Canvas, [{
    key: "_drawCanvas",
    value: function _drawCanvas() {
      var canvas = document.createElement("canvas");
      canvas.width = this._x;
      canvas.height = this._y;
      canvas.style.backgroundColor = this.color;
      var c = canvas.getContext(this.context).fill = this.color;
      this.canvas = canvas;
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      this._drawCanvas();

      return this.canvas;
    }
  }]);

  return Canvas;
}();

exports["default"] = Canvas;