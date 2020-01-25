export default class Canvas {
  constructor({ tilesize, numTiles, uiWidth, context }) {
    this.height = null;
    this.width = null;
    this._tilesize = tilesize || 64;
    this.numTiles = numTiles || 9;
    this.uiWidth = uiWidth || 4;
    this.context = context || "2d";
    this.canvas = null;
    this.ctx = null;
  }
  _setupCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width = this._tilesize * (this.numTiles + this.uiWidth);
    canvas.height = this.height = this._tilesize * this.numTiles;
    canvas.style.height = canvas.height + "px";
    canvas.style.width = canvas.width + "px";
    this.ctx = canvas.getContext(this.context);
    this.ctx.fill = this.color;
    this.ctx.imageSmoothingEnabled = false;
    this.canvas = canvas;
  }
  Display() {
    this._setupCanvas();
    return this.canvas;
  }
  getCtx() {
    return this.ctx;
  }
}
