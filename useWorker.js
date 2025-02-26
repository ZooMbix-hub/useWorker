import React from "react";

const workerScript = (callback) => {
  onmessage = (event) => {
    postMessage(callback(event.data))
  }
};

export const useWorker = (callback) => {
  const [result, setResult] = React.useState(null);
  const workerRef = React.useRef(null);

  React.useEffect(() => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerScript})(${callback})`]))
    );

    workerRef.current = worker;

    worker.onmessage = (event) => {
      setResult(event.data);
    };

    return () => {
      worker.terminate();
    }
  }, callback);

  return {
    result,
    run: (value) =>  workerRef.current.postMessage(value)
  };
};

export const useWorkerAutoDestroy = (callback) => {
  const [result, setResult] = React.useState(null);

  const run = (value) => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerScript})(${callback})`]))
    );

    worker.onmessage = (event) => {
      setResult(event.data);
      worker.terminate();
    };

    worker.postMessage(value);
  };

  return {
    result,
    run
  };
};
