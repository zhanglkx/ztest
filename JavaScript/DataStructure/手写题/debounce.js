const debounce = (fn, time) => {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args); // 直接使用 this
    }, time);
  };
};
