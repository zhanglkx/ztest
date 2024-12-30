class MyPromise {
  promiseState: string;
  promiseRes: null;
  constructor(executor) {
    this.initVale();
    this.initBind();
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  initVale() {
    this.promiseState = "pending";
    this.promiseRes = null;
  }

  initBind() {
    // 初始化this
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    if (this.promiseState !== "pending") {
      return;
    }
    this.promiseRes = value;
    this.promiseState = "fulfilled";
  }

  reject(value) {
    if (this.promiseState !== "pending") {
      return;
    }
    this.promiseRes = value;
    this.promiseState = "rejected";
  }

  then(res, rej) {
    const resFun = typeof rej === "function" ? res : (res) => res;
    const rejFun = typeof rej === "function" ? rej : (rej) => rej;

    if (this.promiseState === "fulfilled") {
      resFun(this.promiseRes);
    } else {
      rejFun(this.promiseRes);
    }
  }
}
