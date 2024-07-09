import { Base2D } from '../core/Base2D';

export class InfoGame extends Base2D {
  score: number = 0;
  coefficient: number = 1;
  level: number = 1;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas, { x: 50, y: 125, width: 50, height: 100 });
  }

  draw(): void {
    if (!this.context) {
      return;
    }

    this.context.font = '32px "Press Start 2P"';
    this.context.fillStyle = '#FFF';
    this.context.textAlign = 'left';
    this.context.fillText(`Score:${this.score}`, this.x, this.y);

    this.context.fillText(
      `x${this.coefficient}`,
      this.x,
      this.y + this.height / 2
    );

    this.context.fillText(
      `Difficulty:${this.level}`,
      this.x,
      this.y + this.height
    );
  }
}
