import AssetManager from "./AssetManager";
import Canvas from "./canvas";
import Map from "./map";
import Tile from "./tile";
import SpriteSheet from "./spritesheet";
import Player from "./player";
import Exit from "./exit";

import util from "./util";
let Game = {
  x: 0,
  y: 0,

  gameState: "loading",

  level: 1,
  numLevels: 6,
  score: 0,
  startingHp: 3,
  maxHp: 6,

  shakeAmount: 0,
  shakeX: 0,
  shakeY: 0,

  spawnRate: null,
  spawnCounter: null,

  spriteSheet: null,
  tileSet: "moiboi.png",

  tilesize: 64,
  numTiles: 9,
  uiWidth: 4,

  canvas: null,
  ctx: null,
  map: null,
  sprite: null,
  startingTile: null,
  player: null,
  playerClass: null,
  monsterClasses: [],
  // Combat Manager
  numActions: 9,
  init() {
    this.canvas = new Canvas({
      tilesize: this.tilesize,
      numTiles: this.numTiles,
      uiWidth: this.uiWidth
    });
    document.body.append(this.canvas.Display());
    this.ctx = this.canvas.getCtx();

    this.sprite = new SpriteSheet({
      ctx: this.ctx,
      tilesize: this.tilesize,
      tileSet: this.tileSet
    });
    this.sprite.spriteSheet = new Image();
    this.sprite.spriteSheet.src = this.tileSet;
    this.sprite.spriteSheet.onload = this.showTitle();
    this.map = new Map(this.numTiles);
    // Move to Sound Manager
    AssetManager.initSounds({
      hit1: new Audio(
        "https://raw.githubusercontent.com/nluqo/broughlike-tutorial/master/docs/completed/stage7/sounds/hit1.wav"
      ),
      hit2: new Audio(
        "https://raw.githubusercontent.com/nluqo/broughlike-tutorial/master/docs/completed/stage7/sounds/hit2.wav"
      ),
      treasure: new Audio(
        "https://raw.githubusercontent.com/nluqo/broughlike-tutorial/master/docs/completed/stage7/sounds/treasure.wav"
      ),
      newLevel: new Audio(
        "https://raw.githubusercontent.com/nluqo/broughlike-tutorial/master/docs/completed/stage7/sounds/newLevel.wav"
      ),
      spell: new Audio(
        "https://raw.githubusercontent.com/nluqo/broughlike-tutorial/master/docs/completed/stage7/sounds/spell.wav"
      )
    });

    window.addEventListener("keydown", this);
  },
  handleEvent(e) {
    if (this.gameState == "title") {
      this.startGame();
    } else if (this.gameState == "dead") {
      this.showTitle();
    } else if (this.gameState == "running") {
      if (e.key == "w") this.player.tryMove(0, -1);
      if (e.key == "s") this.player.tryMove(0, 1);
      if (e.key == "a") this.player.tryMove(-1, 0);
      if (e.key == "d") this.player.tryMove(1, 0);

      if (e.key >= 1 && e.key <= 9) this.player.performAction(e.key - 1);
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
    this.gameState = "title";
    this.drawText("RogueJS", 50, true, this.canvas.height / 2 - 110, "white");
    this.drawText(
      "<A RogueLike/Roguelite Game Engine in Javascript>",
      25,
      true,
      this.canvas.height / 2 - 50,
      "white"
    );
    this.drawScore();
  },

  startGame() {
    this.level = 1;
    this.startLevel(this.startingHp);
    this.gameState = "running";
  },

  startLevel(playerHp, playerActions) {
    this.spawnRate = 15;
    this.spawnCounter = this.spawnRate;
    this.map.generateLevel();
    this.player = new Player(this.map.randomPassableTile());
    this.player.hp = playerHp;
    if (playerActions) {
      this.player.actions = playerActions;
    }
    this.map.randomPassableTile().replace(Exit);
    this.gameLoop();
  },
  draw() {
    if (this.gameState == "running" || this.gameState == "dead") {
      this.gameState;
      this.ctx = this.canvas.getCtx();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.screenShake();
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

      this.drawText("Level: " + this.level, 30, false, 40, "white");
      this.drawText("Score: " + this.score, 30, false, 70, "white");
      for (let i = 0; i < this.player.actions.length; i++) {
        let actionText = i + 1 + ") " + (this.player.actions[i] || "");
        this.drawText(actionText, 20, false, 110 + i * 40, "aqua");
      }
    }
  },
  drawText(text, size, centered, textY, color) {
    this.ctx.fillStyle = color;
    this.ctx.font = size + "px monospace";
    let textX;
    if (centered) {
      textX = (this.canvas.width - this.ctx.measureText(text).width) / 2;
    } else {
      textX = this.canvas.width - this.uiWidth * this.tilesize + 15;
    }

    this.ctx.fillText(text, textX, textY);
  },
  drawScore() {
    let scores = this.getScore();
    if (scores.length) {
      this.drawText(
        util.rightPad(["Run", "Score", "Total"]),
        18,
        true,
        this.canvas.height / 2,
        "white"
      );

      let newestScore = scores.pop();
      scores.sort((a, b) => {
        return b.totalScore - a.totalScore;
      });
      scores.unshift(newestScore);
      for (let i = 0; i < Math.min(10, scores.length); i++) {
        let scoreText = util.rightPad([
          scores[i].run,
          scores[i].score,
          scores[i].totalScore
        ]);
        this.drawText(
          scoreText,
          18,
          true,
          this.canvas.height / 2 + 24 + i * 24,
          i == 0 ? "aqua" : "violet"
        );
      }
    }
  },
  tick() {
    for (let k = this.map.monsters.length - 1; k >= 0; k--) {
      if (!this.map.monsters[k].dead) {
        this.map.monsters[k].update();
      } else {
        this.map.monsters.splice(k, 1);
      }
    }
    Game.player.update();
    if (this.player.dead) {
      this.addScore(this.score, false);
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
  getScore() {
    if (localStorage["scores"]) {
      return JSON.parse(localStorage["scores"]);
    } else {
      return [];
    }
  },
  addScore(score, won) {
    let scores = this.getScore();
    let scoresObject = {
      score: score,
      run: 1,
      totalScore: score,
      active: won
    };
    let lastScore = scores.pop();
    if (lastScore) {
      if (lastScore.active) {
        scoresObject.run = lastScore.run + 1;
        scoresObject.totalScore += localStorage.totalScore;
      } else {
        scores.push(lastScore);
      }
    }
    scores.push(scoresObject);
    localStorage["scores"] = JSON.stringify(scores);
  },
  screenShake() {
    if (this.shakeAmount) {
      this.shakeAmount--;
    }
    let shakeAngle = Math.random() * Math.PI * 2;
    this.shakeX = Math.round(Math.cos(shakeAngle) * this.shakeAmount);
    this.shakeY = Math.round(Math.sin(shakeAngle) + this.shakeAmount);
  }
};

export default Game;
