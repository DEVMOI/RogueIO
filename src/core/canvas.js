export default class Canvas {
  constructor(x, y, color, context) {
    this._x = x || "512";
    this._y = y || 256;
    this.color = color || "#000";
    this.context = context || "2d";
    this.canvas = null;
  }
  _drawCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this._x;
    canvas.height = this._y;
    canvas.style.backgroundColor = this.color;
    let c = (canvas.getContext(this.context).fill = this.color);
    this.canvas = canvas;
  }
  getCanvas() {
    this._drawCanvas();
    return this.canvas;
  }
}
