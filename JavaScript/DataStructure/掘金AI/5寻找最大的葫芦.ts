function solution(n, max, array) {
  // Edit your code here
  let maxRes = 0;
  let threeArr = [];
  let twoArr = [];
  let obj = {};
  let res = [0, 0];

  // 统计每个牌面值的出现次数
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    obj[element] = (obj[element] || 0) + 1;
  }

  // 将出现次数为3和2的牌面值分别存储在数组中
  for (const key in obj) {
    if (obj[key] >= 3) threeArr.push(+key);
    if (obj[key] >= 2) twoArr.push(+key);
  }

  // 对数组进行排序，以便后续比较
  threeArr.sort((a, b) => b - a);
  twoArr.sort((a, b) => b - a);

  // 寻找符合条件的最大“葫芦”组合
  for (const i of threeArr) {
    for (const j of twoArr) {
      const tem = i * 3 + j * 2;
      if (tem <= max && tem > maxRes) {
        maxRes = tem;
        res = [i, j];
      }
    }
  }
  console.log("🚀日志=====", res);
  return res;
}

function main() {
  // Add your test cases here
  //   console.log(JSON.stringify(solution(9, 34, [6, 6, 6, 8, 8, 8, 5, 5, 1])) === JSON.stringify([8, 5]));
  //   console.log(JSON.stringify(solution(9, 37, [9, 9, 9, 9, 6, 6, 6, 6, 13])) === JSON.stringify([6, 9]));
  //   console.log(JSON.stringify(solution(9, 40, [1, 11, 13, 12, 7, 8, 11, 5, 6])) === JSON.stringify([0, 0]));
  console.log(
    JSON.stringify(solution(31, 42, [3, 3, 11, 12, 12, 2, 13, 5, 13, 1, 13, 8, 8, 1, 8, 13, 12, 9, 2, 11, 3, 5, 8, 11, 1, 11, 1, 5, 4, 2, 5])) ===
      JSON.stringify([0, 0])
  );
}

main();
