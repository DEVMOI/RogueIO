import Canvas from "./core/canvas";
import Sprite from "./core/sprite";
import Map from './core/map'
export default () => {
  console.log("RogueJs has initialized...");
  return { Canvas, Sprite,Map };
};
