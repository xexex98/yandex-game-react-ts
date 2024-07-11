import Render from './Render';

export type OptionsElement = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export abstract class Base2D {
  context: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement;

  x: number;
  y: number;
  width: number;
  height: number;

  private _show: boolean = true;

  public get show() {
    return this._show;
  }

  public set show(value: boolean) {
    if (value === this._show || !this.context) {
      return;
    }
    this._show = value;
    if (value) {
      Render.addElement(this, this.context);
    } else {
      Render.delElement(this, this.context);
    }
  }

  constructor(canvas: HTMLCanvasElement, options: OptionsElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = options.x;
    this.y = options.y;
    this.width = options.width ?? 0;
    this.height = options.height ?? 0;
    if (this.context) {
      Render.addElement(this, this.context);
    }
  }
  abstract draw(): void;

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
