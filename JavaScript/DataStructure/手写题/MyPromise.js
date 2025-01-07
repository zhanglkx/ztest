class MyPromise {
  constructor(executor) {

    this.initBind();
    this.initValue();
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  initValue() {
    this.promiseResult = null;
    this.promiseState = 'pending';
  }

  initBind() {
    this.reject = this.reject.bind(this);
    this.resolve = this.resolve.bind(this);
  }

  resolve(value) {
    if (this.promiseState !== 'pending') return;
    this.promiseState = 'fulfilled';
    this.promiseResult = value;
  }

  reject(value) {
    if (this.promiseState !== 'pending') return;
    this.promiseState = 'rejected';
    this.promiseResult = value;
  }


  then(res, rej) {
    res = typeof res === 'function' ? res : res => res;
    rej = typeof rej === 'function' ? rej : rej => rej;
    if (this.promiseState === 'fulfilled') {
      res(this.promiseResult);
    } else {
      rej(this.promiseResult);
    }
  }

}
