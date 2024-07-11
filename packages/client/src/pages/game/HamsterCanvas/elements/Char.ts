import { Base2D } from '../core/Base2D';

const color = '#535C61';
const colorText = '#FFF';

const width = 50;
const height = 50;

export class Char extends Base2D {
  char: string;

  constructor(canvas: HTMLCanvasElement, char: string) {
    super(canvas, { x: 0, y: 0, width: width, height: height });
    this.char = char;
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.closePath();

    this.context.save();
    this.context.lineWidth = 5;
    this.context.fillStyle = color;
    this.context.strokeStyle = '#7A858A';
    this.context.fill();
    this.context.stroke();
    this.context.restore();

    this.context.font = '32px "Press Start 2P"';
    this.context.fillStyle = colorText;
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    this.context.fillText(
      this.char,
      this.x + this.width / 2 + 2,
      this.y + this.height / 2
    );
  }
}
