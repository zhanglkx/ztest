function retyy(fun, time) {
  return new Promise((res, rej) => {
    function retry(para) {
      fun()
        .then(() => {
          res(para);
        })
        .catch((err) => {
          if (time > 0) {
            retry(para);
            time--;
          } else {
            rej(para);
          }
        });
    }
  });
}


// 支持重试的函数
function requestWithRetry(asyncFunc, times=3) {    //times是重试次数，默认为3
    return new Promise(async (resolve, reject) => {
        function reTryFunc(times) {
            asyncFunc().then((res) => {
                    resolve(res)
            }).catch((err) => {
                if (times > 0) {
                    setTimeout(() => {
                        reTryFunc(times - 1)
                    })
                } else {
                    reject(err)
                }
            })
        }
        reTryFunc(times)
    })
}
