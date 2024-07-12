import { Base2D } from './Base2D';

class Render {
  private elements: Record<number, Array<Base2D>> = {};
  private contexts: Array<CanvasRenderingContext2D> = [];

  addElement(element: Base2D, context: CanvasRenderingContext2D) {
    const index = this.contexts.findIndex((el) => el === context);

    if (index === -1) {
      this.contexts.push(context);
      this.elements[this.contexts.length - 1] = [];
      this.elements[this.contexts.length - 1].push(element);
      if (this.contexts.length === 1) {
        this.render();
      }
    } else {
      this.elements[index].push(element);
    }
  }

  delElement(element: Base2D, context: CanvasRenderingContext2D) {
    const index = this.contexts.findIndex((el) => el === context);

    if (index === -1) {
      return;
    }

    const indexElement = this.elements[index].findIndex(
      (item) => item === element
    );

    if (indexElement === -1) {
      return;
    }

    this.elements[index].splice(indexElement, 1);
  }

  clearContext(context: CanvasRenderingContext2D) {
    const index = this.contexts.findIndex((el) => el === context);

    if (index === -1) {
      return;
    }

    this.contexts.splice(index, 1);
    this.elements[index] = [];

    context.clearRect(0, 0, innerWidth, innerHeight);
  }

  private render() {
    this.contexts.forEach((ctx, index) => {
      if (ctx) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.elements[index].forEach((element) => element.draw());
      }
    });
    if (this.contexts.length > 0) {
      requestAnimationFrame(this.render.bind(this));
    }
  }
}

export default new Render();
