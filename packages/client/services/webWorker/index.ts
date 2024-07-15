
let worker:Worker

if (window.Worker) {
   worker = new Worker("webWorker.js");

} else {
  console.info('Your browser doesn\'t support web workers.');
}

export const startWebWorker = () => {
  if (worker) {
    worker.postMessage('start');

    worker.onmessage = function(e) {
      console.info('data from web worker', e.data);
    }
  }
}
