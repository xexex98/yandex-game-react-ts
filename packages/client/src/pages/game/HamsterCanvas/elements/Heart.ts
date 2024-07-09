import BreakHeartImg from '../assets/break-heart.svg';
import HeartImg from '../assets/heart.svg';
import { Animate } from '../core/Animate';
import { Base2D, optionsElement } from '../core/Base2D';

export class Heart extends Base2D {
  image: HTMLImageElement;
  heatBit: () => Promise<true | undefined>;
  private _break: boolean = false;

  public get break() {
    return this._break;
  }

  public set break(value: boolean) {
    if (value === this._break) {
      return;
    }
    this._break = value;
    this.image.src = value ? BreakHeartImg : HeartImg;
  }

  constructor(canvas: HTMLCanvasElement, options: optionsElement) {
    super(canvas, { ...options, width: 50, height: 50 });
    this.image = new Image();
    this.image.src = HeartImg;

    const widthLocal = this.width;
    const heightLocal = this.height;

    const dx = (widthLocal + widthLocal * 0.2 - widthLocal) / 4;
    const dy = (heightLocal + heightLocal * 0.2 - heightLocal) / 4;

    this.heatBit = Animate(() => {
      this.width += dx;
      this.height += dy;

      if (this.width > widthLocal + widthLocal * 0.2) {
        return true;
      }
    })(() => {
      this.width -= dx;
      this.height -= dy;

      if (this.width < widthLocal) {
        this.width = widthLocal;
        this.height = widthLocal;
        return true;
      }
    })(2);
  }

  draw() {
    if (!this.image || !this.context) {
      return;
    }
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  async breackHeart() {
    const closeAnimation = await this.heatBit();

    if (closeAnimation) {
      this.break = true;
    }
  }
}
