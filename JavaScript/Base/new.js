function _New(fn, args) {
  const obj = Object.create(fn.prototype);
  const ret = Object.apply(obj, args);
  return ret instanceof Object ? ret:obj;
}
