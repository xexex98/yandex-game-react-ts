import ArrowImg from '../assets/arrow.svg';
import { Animate } from '../core/Animate';
import { Base2D, optionsElement } from '../core/Base2D';

export class Arrow extends Base2D {
  private image: HTMLImageElement;
  constructor(canvas: HTMLCanvasElement, options: optionsElement) {
    super(canvas, { ...options, width: 50, height: 50 });

    this.image = new Image();
    this.image.src = ArrowImg;

    const dy = 1.7;
    let changeY = 0;

    Animate(() => {
      this.y -= dy;
      changeY += dy;
      if (changeY > this.height / 2) {
        return true;
      }
    })(() => {
      this.y += dy;
      changeY -= dy;
      if (changeY <= 0) {
        changeY = 0;
        return true;
      }
    })('infinity')();
  }

  draw(): void {
    if (!this.context || !this.image) {
      return;
    }
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
