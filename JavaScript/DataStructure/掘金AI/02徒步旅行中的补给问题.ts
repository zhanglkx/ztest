/**
 * 只管往前走，发现食物不够的话，从“过去的补给站”中找最便宜的一个，“为目前一步”购买一份食物。
 * 根据规则，我们当然不可能拐回去购买，但是我们只是用这个方法来思考问题，实际上认为我们是“在当时购买”的就可以了
 * @param n 天数
 * @param k 最多持有分数
 * @param data 每天的价格
 * @returns 最终价格
 */
// function minCost(n: number, k: number, data: number[]): number {
//   let priceArr = [];
//   let total = 0;
//   for (let index = 0; index < data.length; index++) {
//     const element = data[index];
//     priceArr.push(element);
//     if (priceArr.length > k) {
//       priceArr.shift();
//     }

//     let price = Math.min(...priceArr);

//     total += price;
//   }
//   return total;
// }

// 使用滑动窗口：
// function minCost(n: number, k: number, data: number[]): number {
//   return data.reduce((total, _, i) => total + Math.min(...data.slice(Math.max(0, i - k + 1), i + 1)), 0);
// }

function minCost(n: number, k: number, data: number[]): number {
  return data.reduce((total, curr, i) => {
    const start = Math.max(0, i - k + 1);
    const price = Math.min(...data.slice(start, i + 1));
    return total + price;
  }, 0);
}

// 示例调用
let n1 = 5;
let k1 = 2;
let data1 = [1, 2, 3, 3, 2];
console.log(minCost(n1, k1, data1));

let n2 = 6;
let k2 = 3;
let data2 = [4, 1, 5, 2, 1, 3];
console.log(minCost(n2, k2, data2));

let n3 = 4;
let k3 = 1;
let data3 = [3, 2, 4, 1];
console.log(minCost(n3, k3, data3));
