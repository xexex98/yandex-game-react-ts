import { Animate } from '../core/Animate';
import { Base2D, optionsElement } from '../core/Base2D';

const color = ['#6600CC', '#FFCC00', '#9EA9F0', '#CC0000'];

export class Circle extends Base2D {
  dx: number;
  dy: number;
  radius: number;
  color: string;

  constructor(
    canvas: HTMLCanvasElement,
    dx: number,
    dy: number,
    radius: number,
    options: optionsElement
  ) {
    super(canvas, { ...options });
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color[Math.floor(Math.random() * color.length)];

    Animate(() => {
      if (
        this.x + this.radius >= this.canvas.width ||
        this.x - this.radius <= 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.radius >= this.canvas.height ||
        this.y - this.radius <= 0
      ) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y -= this.dy;
      return true;
    })('infinity')();
  }

  draw() {
    if (this.context) {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.stroke();
    }
  }
}
