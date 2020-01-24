export default class Sprite {
  constructor({ ctx }) {
    this.ctx = ctx;
  }

  drawRect(x = 1, y = 1, fillColor = "red", height = 25, width = 25) {
    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(x, y, height, width);
  }
}
