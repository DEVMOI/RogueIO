// import init from "./lib";
import RogueJs from "./src";
let { Game } = RogueJs();
import { Blob, Ent, Golem, MerQueen, Raptor } from "./Examples";

// Game.numTiles = 7;
let arr = [Blob, Raptor, Golem, Ent, MerQueen];
Game.registerMonsters(arr);
Game.init();
