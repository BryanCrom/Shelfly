export function debouncePromise(fn, time) {
  let timer = undefined;

  function debounced(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(fn(...args)), time);
    });
  }

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return debounced;
}
