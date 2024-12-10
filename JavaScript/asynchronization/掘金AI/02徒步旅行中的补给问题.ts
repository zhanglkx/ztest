function minCost(n: number, k: number, data: number[]): number {
  let price: number[] = [];
  let now_food: number = 0;
  let total: number = 0;
  for (const i of data) {
    price.push(i);
    if (price.length > k) {
      price.shift();
    }
    now_food -= 1;
    if (now_food < 0) {
      total += Math.min(...price);
      now_food += 1;
    } else {
      console.log("🚀日志=====", now_food);
    }
  }
  return total;
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
