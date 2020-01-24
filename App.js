// import init from "./lib";
import init from "./src";
const { Canvas, Sprite } = init();
let canvas = new Canvas({ width: 60, height: 20, tilesize: 10 });

document.body.append(canvas.getCanvas());
const sprite = new Sprite({ ctx: canvas.getCtx() });

let item1 = sprite;
item1.drawRect();

sprite.drawRect(10, 15, "green");
