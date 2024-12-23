/**
 * 计算给定数字数组中所有可能的组合，使得每个组合的各位数字之和为偶数的数量。
 *
 * @param numbers - 包含数字字符串的数组，每个字符串代表一个数字组。
 * @returns 满足条件的组合数量。
 */
function solution(numbers: string[]) {
  // 预处理：将每个数字组转换为数组，并计算每个数字的各位数字之和
  let digitSums = numbers.map((group) => {
    // 将数字组字符串拆分成单个数字字符
    return group.split("").map((digit) => parseInt(digit));
  });

  // 初始化计数器
  let count = 0;

  /**
   * 递归函数：生成所有可能的组合并判断是否满足条件
   * @param index 当前处理的数字组索引
   * @param currentSum 当前组合的各位数字之和
   */
  function backtrack(index: number, currentSum: number) {
    // 如果已经遍历完所有数字组
    if (index === digitSums.length) {
      // 判断当前组合的各位数字之和是否为偶数
      if (currentSum % 2 === 0) {
        // 如果是偶数，计数器加一
        count++;
      }
      // 返回，结束当前递归分支
      return;
    }

    // 遍历当前数字组中的每个数字
    for (let digit of digitSums[index]) {
      // 选择当前数字并进入下一步递归，更新索引和当前和
      backtrack(index + 1, currentSum + digit);
    }
  }

  // 从第一个数字组开始递归
  backtrack(0, 0);

  // 返回满足条件的组合数量
  return count;
}

function main() {
  // 你可以添加更多测试用例
//   console.log(solution(["123", "456", "789"]) === 14);
  console.log(solution(["123456789"]) === 4);
//   console.log(solution(["14329", "7568"]) === 10);
}

main();
