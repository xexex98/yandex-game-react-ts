import { chars, keyMap } from './constants/Chars';
import { Levels } from './constants/Levels';
import { Arrow } from './elements/Arrow';
import { Char } from './elements/Char';
import { Circle } from './elements/Circle';
import { Heart } from './elements/Heart';
import { InfoGame } from './elements/InfoGame';
import { Timer } from './elements/Timer';

type callBackEndGame = (score: number) => void;

export class Game {
  canvas: HTMLCanvasElement;

  private timer: Timer;
  private infoGame: InfoGame;
  private arrow: Arrow;

  private heart: Array<Heart> = [];
  private chars: Array<Char> = [];

  private level: number = 0;
  private score: number = 0;

  private keyUp: (event: KeyboardEvent) => void;
  private resize: () => void;
  private callBackEndGame?: callBackEndGame;

  private activeGame: boolean = true;

  constructor(canvas: HTMLCanvasElement, callBackEndGame?: callBackEndGame) {
    this.callBackEndGame = callBackEndGame;
    this.canvas = canvas;
    this.initBoard();
    this.infoGame = new InfoGame(canvas);
    this.arrow = new Arrow(canvas, { x: 300, y: 0 });
    this.heart = [
      new Heart(canvas, { x: 50, y: 50 }),
      new Heart(canvas, { x: 125, y: 50 }),
      new Heart(canvas, { x: 200, y: 50 }),
    ];
    this.timer = new Timer(canvas, () => {
      this.breackHeart();
    });

    this.keyUp = (event: KeyboardEvent) => {
      const char = keyMap[event.code];

      if (this.chars[0].char === char) {
        this.success();
      } else {
        this.breackHeart();
      }
    };

    this.resize = () => {
      this.updateCharsPosition();
      this.timer.setPosition(innerWidth / 2 - 150, innerHeight - 110);
    };

    window.addEventListener('resize', this.resize);
  }

  startGame() {
    this.activeGame = true;
    window.addEventListener('keydown', this.keyUp);
    this.round();
  }

  endGame() {
    if (!this.activeGame) {
      return;
    }
    window.removeEventListener('keydown', this.keyUp);
    window.removeEventListener('resize', this.resize);

    this.clearChar();
    this.arrow.show = false;
    this.timer.show = false;

    if (this.callBackEndGame) {
      this.callBackEndGame(this.infoGame.score);
    }
    this.activeGame = false;
  }

  private round() {
    if (!this.activeGame) {
      return;
    }
    this.nextLevel();
    this.initChar();
    this.timer.startTime(Levels[this.level].time);
  }

  private initBoard() {
    for (let i = 0; i < 900; i++) {
      const r = Math.floor(Math.random() * 3) + 1;
      const x = Math.random() * (innerWidth - r * 2) + r;
      const y = Math.random() * (innerHeight - r * 2) + r;
      const dx = (Math.random() - 0.5) * 5;
      const dy = (Math.random() - 0.5) * 5;

      new Circle(this.canvas, dx, dy, r, { x, y });
    }
  }

  private nextLevel() {
    const maxScore = Levels[this.level].maxScore;

    if (typeof maxScore === 'undefined' || maxScore > this.infoGame.score) {
      return;
    }

    this.level++;
    this.infoGame.coefficient = Levels[this.level].coefficient;
    this.infoGame.level = this.level + 1;
  }

  private initChar() {
    const availableChars = chars.slice(0, Levels[this.level].variousSymbols);

    for (let i = 0; i < Levels[this.level].countChar; ++i) {
      const randomCharIndex = Math.round(
        Math.random() * Levels[this.level].countChar
      );

      this.chars.push(new Char(this.canvas, availableChars[randomCharIndex]));
    }

    this.updateCharsPosition();
  }

  private updateArrowPosition() {
    if (!this.chars.length) {
      this.arrow.show = false;
      return;
    }
    this.arrow.show = true;
    const x = this.chars[0].x;
    const y = this.chars[0].y;

    this.arrow.setPosition(x, y - 75);
  }

  private updateCharsPosition() {
    if (!this.chars.length) {
      this.arrow.show = false;
      return;
    }
    const startX =
      innerWidth / 2 -
      (this.chars.length * 50 + 25 * (this.chars.length - 1)) / 2;

    this.chars.forEach((char, index) => {
      char.setPosition(startX + 75 * index, innerHeight / 2 - 25);
    });
    this.updateArrowPosition();
  }

  private async breackHeart() {
    const heart = this.heart.toReversed().find((heart) => !heart.break);

    if (heart) {
      heart.breackHeart();
      await this.clearChar();
      this.round();
    } else {
      this.endGame();
    }
  }

  private clearChar() {
    this.chars.forEach((char) => {
      char.show = false;
    });
    this.chars = [];
  }

  private success() {
    this.chars[0].show = false;
    this.chars.splice(0, 1);
    this.infoGame.score += Math.floor(5 * Levels[this.level].coefficient);

    if (this.chars.length === 0) {
      this.round();
    }

    this.updateCharsPosition();
  }
}
