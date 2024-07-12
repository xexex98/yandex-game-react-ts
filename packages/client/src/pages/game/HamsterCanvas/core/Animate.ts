type CallBackAnimate = () => true | undefined;
type Action = () => Promise<true | undefined>;
type Repeat = number | 'infinity';
interface Step {
  (value: CallBackAnimate): Step;
  (value?: Repeat): Action;
}

export function Animate(callBack: CallBackAnimate): Step {
  const animateStep: Array<CallBackAnimate> = [];

  animateStep.push(callBack);

  let currentStep = 0;
  let countRepeat: Repeat = 1;
  let repeat = 1;

  const action: Action = () => {
    return new Promise((resolve) => {
      const fn = () => {
        const closeAnswer = animateStep[currentStep]();

        if (closeAnswer) {
          currentStep++;
        }

        if (animateStep.length === currentStep && countRepeat !== 'infinity') {
          currentStep = 0;
          if (repeat >= countRepeat) {
            repeat = 1;
            resolve(true);
            return true;
          }
          repeat++;
        }
        if (countRepeat === 'infinity' && animateStep.length === currentStep) {
          currentStep = 0;
        }
        requestAnimationFrame(fn);
      };

      fn();
    });
  };

  const step: Step = ((value) => {
    if (typeof value === 'function') {
      animateStep.push(value);
      return step;
    }
    if ((typeof value === 'number' && value > 0) || value === 'infinity') {
      countRepeat = value;
    }
    return action;
  }) as Step;

  return step;
}
