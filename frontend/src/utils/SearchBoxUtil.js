export function debouncePromise(fn, time) {
  let timer = undefined;

  return function debounced(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}
