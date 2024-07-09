import Clock from '../assets/clock.svg';
import { Animate } from '../core/Animate';
import { Base2D } from '../core/Base2D';

const colorActive = '#7A858A';
const colorTimer = '#535C61';
const colorText = '#FFFFFF';

export class Timer extends Base2D {
  private time: number = 1;
  private timeBegin: number = 0;
  private currantTime: number = 0;
  private progress: number = 0;
  private timer: () => Promise<true | undefined>;
  private image: HTMLImageElement;

  private callBackTimer?: () => void;

  constructor(canvas: HTMLCanvasElement, callBackTimer?: () => void) {
    super(canvas, {
      x: innerWidth / 2 - 150,
      y: innerHeight - 110,
      width: 300,
      height: 50,
    });
    this.image = new Image();
    this.image.src = Clock;
    this.callBackTimer = callBackTimer;

    this.timer = Animate(() => {
      const dt = (performance.now() - this.timeBegin) / 1000;

      this.progress = dt / this.time;
      this.currantTime = Math.round((this.time - dt) * 100) / 100;
      if (this.currantTime <= 0) {
        this.currantTime = 0;
        this.progress = 0;
        return true;
      }
    })();
  }

  draw() {
    if (!this.context || !this.image) {
      return;
    }

    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = colorTimer;
    this.context.fill();
    this.context.closePath();

    const dx = this.width - this.width * this.progress;

    this.context.beginPath();
    this.context.rect(this.x, this.y, dx, this.height);
    this.context.fillStyle = colorActive;
    this.context.fill();
    this.context.closePath();

    this.context.drawImage(this.image, this.x - 45, this.y - 30, 90, 90);

    this.context.font = '16px "Press Start 2P"';
    this.context.fillStyle = colorText;
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'left';
    this.context.fillText(
      `${this.currantTime}`,
      this.x + 45 + 8,
      this.y + this.height / 2
    );
  }

  async startTime(time: number) {
    if (time <= 0) {
      return;
    }
    this.time = time;
    this.currantTime = time;
    this.timeBegin = performance.now();

    await this.timer();
    if (this.callBackTimer) {
      this.callBackTimer();
    }
  }
}
