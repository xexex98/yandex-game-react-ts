import { chars, keyMap } from './constants/Chars';
import { Levels } from './constants/Levels';
import { Arrow } from './elements/Arrow';
import { Char } from './elements/Char';
import { Circle } from './elements/Circle';
import { Heart } from './elements/Heart';
import { InfoGame } from './elements/InfoGame';
import { Timer } from './elements/Timer';

type CallBackEndGame = () => void;
type CallBackStopGame = (score: number) => void;

const startPositionArrow = {
  x: 300,
  y: 0,
};

const positionHearts = [
  { x: 50, y: 50 },
  { x: 125, y: 50 },
  { x: 200, y: 50 },
];

export class Game {
  canvas: HTMLCanvasElement;

  private timer: Timer;
  private infoGame: InfoGame;
  private arrow: Arrow;

  heart: Array<Heart> = [];
  chars: Array<Char> = [];

  private level: number = 0;
  private score: number = 0;

  keyUp: (event: KeyboardEvent) => void;
  private resize: () => void;
  private callBackEndGame?: CallBackEndGame;
  private callBackStopGame?: CallBackStopGame;

  private activeGame: boolean = true;
  private awarded = 5;

  constructor(
    canvas: HTMLCanvasElement,
    callBackEndGame?: CallBackEndGame,
    callBackStopGame?: CallBackStopGame
  ) {
    this.callBackEndGame = callBackEndGame;
    this.canvas = canvas;
    this.initBoard();
    this.infoGame = new InfoGame(canvas);
    this.arrow = new Arrow(canvas, startPositionArrow);
    this.heart = [
      new Heart(canvas, positionHearts[0]),
      new Heart(canvas, positionHearts[1]),
      new Heart(canvas, positionHearts[2]),
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
      this.timer.updateCenterPosition();
    };

    this.callBackStopGame = callBackStopGame;

    window.addEventListener('resize', this.resize);
  }

  startGame() {
    this.activeGame = true;
    window.addEventListener('keydown', this.keyUp);
    this.round();
  }

  stopGame() {
    if (!this.activeGame) {
      return;
    }
    window.removeEventListener('keydown', this.keyUp);
    window.removeEventListener('resize', this.resize);

    this.clearChar();
    this.arrow.show = false;
    this.timer.show = false;

    this.activeGame = false;

    if (this.callBackStopGame) {
      this.callBackStopGame(this.infoGame.score);
    }
  }

  private endGame() {
    this.stopGame();
    if (this.callBackEndGame) {
      this.callBackEndGame();
    }
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

    const margin = 25;

    this.arrow.setPosition(x, y - this.chars[0].width - margin);
  }

  private updateCharsPosition() {
    if (!this.chars.length) {
      this.arrow.show = false;
      return;
    }

    const margin = 25;

    const startX =
      innerWidth / 2 -
      (this.chars.length * this.chars[0].width +
        margin * (this.chars.length - 1)) /
        2;

    this.chars.forEach((char, index) => {
      char.setPosition(
        startX + (this.chars[0].width + margin) * index,
        innerHeight / 2 - margin
      );
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
    this.infoGame.score += Math.floor(
      this.awarded * Levels[this.level].coefficient
    );

    if (this.chars.length === 0) {
      this.round();
    }

    this.updateCharsPosition();
  }
}
