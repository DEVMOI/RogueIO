import { initSounds, playSound } from "./AssetManager";
import Canvas from "./canvas";
import Map from "./map";
import Options from "./options";
import Tile from "./tile";
import SpriteSheet from "./spritesheet";
import Player from "./player";
import Exit from "./exit";

import util from "./util";
class Game {
  constructor() {
    this.options = Options;
  }
  static setOptions(opts) {
    if (typeof opts == "object") {
      for (var prop in opts) {
        Options[prop] = opts[prop];
      }
    }
  }
  init() {
    Options.canvas = new Canvas({
      tilesize: Options.tilesize,
      numTiles: Options.numTiles,
      uiWidth: Options.uiWidth
    });
    document.body.append(Options.canvas.Display());
    Options.ctx = Options.canvas.getCtx();

    Options.sprite = new SpriteSheet({
      ctx: Options.ctx,
      tilesize: Options.tilesize,
      tileSet: Options.tileSet
    });
    Options.sprite.spriteSheet = new Image();
    Options.sprite.spriteSheet.src = Options.tileSet;
    Options.sprite.spriteSheet.onload = this.showTitle();
    Options.map = new Map(Options.numTiles);
    // Move to Sound Manager
    initSounds({
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
  }
  handleEvent(e) {
    if (Options.gameState == "title") {
      this.startGame();
    } else if (Options.gameState == "dead") {
      this.showTitle();
    } else if (Options.gameState == "running") {
      if (e.key == "w") Options.player.tryMove(0, -1);
      if (e.key == "s") Options.player.tryMove(0, 1);
      if (e.key == "a") Options.player.tryMove(-1, 0);
      if (e.key == "d") Options.player.tryMove(1, 0);

      if (e.key >= 1 && e.key <= 9) Options.player.performAction(e.key - 1);
    }
  }
  gameLoop(interval = 15) {
    setInterval(() => {
      this.draw();
    }, interval);
  }
  showTitle() {
    Options.ctx.fillStyle = "rgba(0,0,0,.75)";
    Options.ctx.fillRect(0, 0, Options.canvas.width, Options.canvas.height);
    Options.gameState = "title";
    this.drawText(
      "RogueJS",
      50,
      true,
      Options.canvas.height / 2 - 110,
      "white"
    );
    this.drawText(
      "<A RogueLike/Roguelite Game Engine in Javascript>",
      25,
      true,
      Options.canvas.height / 2 - 50,
      "white"
    );
    this.drawScore();
  }

  startGame() {
    Options.level = 1;
    this.startLevel(Options.startingHp);
    Options.gameState = "running";
  }

  startLevel(playerHp, playerActions) {
    Options.spawnRate = 15;
    Options.spawnCounter = Options.spawnRate;
    Options.map.generateLevel();
    Options.player = new Player(Options.map.randomPassableTile());
    Options.player.hp = playerHp;
    if (playerActions) {
      Options.player.actions = playerActions;
    }
    Options.map.randomPassableTile().replace(Exit);
    this.gameLoop();
  }
  draw() {
    if (Options.gameState == "running" || Options.gameState == "dead") {
      Options.gameState;
      Options.ctx = Options.canvas.getCtx();
      Options.ctx.clearRect(0, 0, Options.canvas.width, Options.canvas.height);
      this.screenShake();
      for (let i = 0; i < Options.numTiles; i++) {
        for (let j = 0; j < Options.numTiles; j++) {
          Options.map.getTile(i, j).draw();
        }
      }
      for (let i = 0; i < Options.map.monsters.length; i++) {
        Options.map.monsters[i].draw();
      }
      // Draws Character
      Options.player.draw();

      this.drawText("Level: " + Options.level, 30, false, 40, "white");
      this.drawText("Score: " + Options.score, 30, false, 70, "white");
      for (let i = 0; i < Options.player.actions.length; i++) {
        let actionText = i + 1 + ") " + (Options.player.actions[i] || "");
        this.drawText(actionText, 20, false, 110 + i * 40, "aqua");
      }
    }
  }
  drawText(text, size, centered, textY, color) {
    Options.ctx.fillStyle = color;
    Options.ctx.font = size + "px monospace";
    let textX;
    if (centered) {
      textX = (Options.canvas.width - Options.ctx.measureText(text).width) / 2;
    } else {
      textX = Options.canvas.width - Options.uiWidth * Options.tilesize + 15;
    }

    Options.ctx.fillText(text, textX, textY);
  }
  drawScore() {
    let scores = this.getScore();
    if (scores.length) {
      this.drawText(
        util.rightPad(["Run", "Score", "Total"]),
        18,
        true,
        Options.canvas.height / 2,
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
          Options.canvas.height / 2 + 24 + i * 24,
          i == 0 ? "aqua" : "violet"
        );
      }
    }
  }
  tick() {
    for (let k = Options.map.monsters.length - 1; k >= 0; k--) {
      if (!Options.map.monsters[k].dead) {
        Options.map.monsters[k].update();
      } else {
        Options.map.monsters.splice(k, 1);
      }
    }
    Game.player.update();
    if (Options.player.dead) {
      this.addScore(Options.score, false);
      Options.gameState = "dead";
    }
    Options.spawnCounter--;
    if (Options.spawnCounter <= 0) {
      Options.map.spawnMonster();
      Options.spawnCounter = Options.spawnRate;
      Options.spawnRate--;
    }
  }
  registerMonsters(arr) {
    Options.monsterClasses = arr;
  }
  getScore() {
    if (localStorage["scores"]) {
      return JSON.parse(localStorage["scores"]);
    } else {
      return [];
    }
  }
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
  }
  screenShake() {
    if (Options.shakeAmount) {
      Options.shakeAmount--;
    }
    let shakeAngle = Math.random() * Math.PI * 2;
    Options.shakeX = Math.round(Math.cos(shakeAngle) * Options.shakeAmount);
    Options.shakeY = Math.round(Math.sin(shakeAngle) + Options.shakeAmount);
  }
}

export default Game;
