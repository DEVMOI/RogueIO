// import RogueIO from "./index.js";
import Options from "./src/core/options";
import RogueIO from "./src";
let { init, RNG, Map, Sprite, TileEngine, Game } = RogueIO;

RNG.setSeed("Miya");
let { canvas, context } = init();

let map = {};

var tileSize = 64,
  numTiles = 9,
  uiWidth = 4;
var w = tileSize * (numTiles + uiWidth),
  h = tileSize * numTiles;
canvas.width = tileSize * (numTiles + uiWidth);
canvas.height = tileSize * numTiles;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.style.lineSpacing = 7;
context.textAlign = "center";
context.textBaseline = "middle";
context.font = "15px sans-serif";
context.imageSmoothingEnabled = false;
const _generateMap = () => {
  var freeCells = [];
  var digger = new Map.Digger(w, h);
  var digCallback = function(x, y, value) {
    if (value) {
      return;
    } /* do not store walls */

    var key = x + "," + y;
    freeCells.push([key]);
    map[key] = "";
  };
  digger.create(digCallback.bind(this));
  _drawWholeMap();
};
const _drawWholeMap = function() {
let image = new Image();
image.src = "moiboi.png";
  for (var key in map) {
    // use spriteSheet to create animations from an image


    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    let sprite = Sprite({
      x: x, // starting x,y position of the sprite
      y: y,
      color: "#000", // fill color of the sprite rectangle
      // width: 1, // width and height of the sprite rectangle
      // height: 1,
      image: image
    });
    sprite.render();
  }
};

// tileEngine.render();
_generateMap();
console.log("context: ", context);
console.log("canvas: ", canvas);
console.log("mape: ", map);

// let gameLoop = Game({
//   update() {},
//   render: function() {}
// });
// gameLoop.start();
