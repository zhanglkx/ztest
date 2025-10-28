
// 1. 参数名遮蔽（Variable Shadowing）

//   在 try-catch 中的区别
async function test() {
  try {
    return Promise.reject('error');  // ❌ 不会被 catch 捕获
  } catch (e) {
    console.log('caught:', e);
  }
}

async function test2() {
  try {
    return await Promise.reject('error');  // ✅ 会被 catch 捕获
  } catch (e) {
    console.log('caught:', e);
  }
}


// ❌ 不会按预期工作
// async function fn() {
//   [1, 2, 3].forEach(async (item) => {
//     await delay(1000);
//     console.log(item);
//   });
//   console.log('done');  // 会立即执行
// }

// // ✅ 正确方式
// async function fn() {
//   for (const item of [1, 2, 3]) {
//     await delay(1000);
//     console.log(item);
//   }
//   console.log('done');  // 等待所有完成后执行
// }


function promiseAll(reject) {
    return new Promise((resolve, reject) => {
      // reject(new Error('error'));
      reject(1);
    });
}

async function test() {
 try {
  const res = await promiseAll(1);  
  console.log('🚀日志=====try ', res);
 } catch (error) {
  console.log('🚀日志=====catch ', error);
 }
}

function test2() {
  promiseAll(1).then(res => {
    console.log('🚀日志=====then2 ', res);
  }).catch(error => {
    console.log('🚀日志=====catch2 ', error);
  });
}

// test();
// test2();

// 只能捕获前面的错误
Promise.reject(1)
  .then(res => console.log(res))
  .catch(err => console.log('catch1:', err)) // 会执行
  .then(() => {
    console.log('🚀日志=====then3 ');
 throw new Error('error2'); 
})
  .catch(err => console.log('catch2:', err)); // 也会执行

// 输出: catch1: 1
//       catch2: Error: error2



// 