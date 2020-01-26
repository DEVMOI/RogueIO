import Canvas from "./canvas";
import Map from "./map";
import Tile from "./tile";
import Player from "./player";
import SpriteSheet from "./spritesheet";
import Exit from "./exit";

let Game = {
  x: 0,
  y: 0,

  gameState: "loading",

  level: 1,
  numLevels: 6,

  startingHp: 3,
  maxHp: 6,

  spawnRate: null,
  spawnCounter: null,

  spriteSheet:null,
  tileSet: 'moiboi.png',

  tilesize: 64,
  numTiles: 9,
  uiWidth: 4,

  canvas: null,
  ctx: null,
  map: null,
  sprite: null,
  startingTile: null,
  player: null,
  monsterClasses: [],

  init() {
    this.canvas = new Canvas({
      tilesize: this.tilesize,
      numTiles: this.numTiles,
      uiWidth: this.uiWidth
    });
    document.body.append(this.canvas.Display());
    this.ctx = this.canvas.getCtx();

     this.spriteSheet = new Image();
     this.spriteSheet.src = this.tileSet;
     this.spriteSheet.onload = this.showTitle();
   
    this.sprite = new SpriteSheet({
      ctx: this.ctx,
      tilesize: this.tilesize,
      spriteSheet:this.spriteSheet
    });

    this.map = new Map(this.numTiles);

    window.addEventListener("keydown", this);

    
  },
  handleEvent(e) {
    if(this.gameState == "loading") this.showTitle()
    if (e.key || this.gameState == "title") {
      console.log("title");
      this.startGame();
    } else if (this.gameState == "dead") {
      console.log("deag");
      this.showTitle();
    } else if (this.gameState == "running") {
      console.log(e);
      if (e.key == "w") this.player.tryMove(0, -1);
      if (e.key == "s") this.player.tryMove(0, 1);
      if (e.key == "a") this.player.tryMove(-1, 0);
      if (e.key == "d") this.player.tryMove(1, 0);
    }
  },
  gameLoop(interval = 15) {
    setInterval(() => {
      this.draw();
    }, interval);
  },
    showTitle() {
    this.ctx.fillStyle = "rgba(0,0,0,.75)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawText("RogueJS", 70, true, this.canvas.height / 2 - 110, "white");
    this.drawText(
      "A Light RogueLike JavaScript Game Engine...",
      40,
      true,
      this.canvas.height / 2 - 50,
      "white"
      );
      this.gameState = "title";
  },

  startGame() {
    console.log('starting')
    this.level = 1;
    this.startLevel(this.startingHp);
    this.gameState = "running";
  },

  startLevel(playerHp) {
    console.log('level starting')
   
    this.spawnRate = 15;
    this.spawnCounter = this.spawnRate;
    this.map.generateLevel();
    this.player = new Player(this.map.randomPassableTile());
     this.gameLoop();
    this.player.hp = playerHp;
    this.map.randomPassableTile().replace(Exit);
  },
  draw() {
    if (this.gameState == "running" || this.gameState == "dead") {
  
      this.ctx = this.canvas.getCtx();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.numTiles; i++) {
        for (let j = 0; j < this.numTiles; j++) {
         
          this.map.getTile(i, j).draw();
        }
      }
      for (let i = 0; i < this.map.monsters.length; i++) {
        this.map.monsters[i].draw();
      }
      // Draws Character
      this.player.draw();
      this.drawText("Level: " + this.level, 30, false, 40, "violet");
    }
  },
  drawText(text, size, centered, textY, color) {
    this.ctx.fillStyle = color;
    this.ctx.font = size + "px monospace";
    let textX;
    if (centered) {
      textX = (this.canvas.width - this.ctx.measureText(text).width) / 2;
    } else {
      textX = this.canvas.width - this.uiWidth * this.tileSize + 25;
    }

    this.ctx.fillText(text, textX, textY);
  },
  tick() {
    for (let k = this.map.monsters.length - 1; k >= 0; k--) {
      if (!this.map.monsters[k].dead) {
        this.map.monsters[k].update();
      } else {
        this.map.monsters.splice(k, 1);
      }
    }
    if (this.player.dead) {
      this.gameState = "dead";
    }
    this.spawnCounter--;
    if (this.spawnCounter <= 0) {
      this.map.spawnMonster();
      this.spawnCounter = this.spawnRate;
      this.spawnRate--;
    }
  },
  registerMonsters(arr) {
    this.monsterClasses = arr;
  },

};

export default Game;
