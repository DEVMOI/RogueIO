export default class Canvas {
  constructor({ x, y, tilesize, backgroundColor, context }) {
    this._x = x || 80;
    this._y = y || 25;
    this._tilesize = tilesize || 16;
    this.backgroundColor = backgroundColor || "#000";
    this.context = context || "2d";
    this.canvas = null;
    this.ctx = null;
  }
  _drawCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this._x * this._tilesize;
    canvas.height = this._y * this._tilesize;
    canvas.style.backgroundColor = this.backgroundColor;
    this.ctx = canvas.getContext(this.context);
    this.ctx.fill = this.color;
    this.canvas = canvas;
  }
  getCanvas() {
    this._drawCanvas();
    return this.canvas;
  }
  getCtx() {
    return this.ctx;
  }
}
