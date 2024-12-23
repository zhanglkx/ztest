// function solution(s) {
//   // 分割整数部分和小数部分
//   const splitArr = s.split(".");
//   let integerPart = splitArr[0];
//   const decimalPart = splitArr[1] || "";

//   // 去除整数部分的前导零
//   integerPart = BigInt(integerPart).toString();

//   // 处理整数部分的千分位格式化
//   let beforeArr = [];
//   for (let index = integerPart.length; index > 0; index -= 3) {
//     beforeArr.unshift(integerPart.slice(Math.max(index - 3, 0), index));
//   }

//   // 拼接整数部分和小数部分
//   let formattedStr = beforeArr.join(",");
//   if (decimalPart) {
//     formattedStr += "." + decimalPart;
//   }

//   return formattedStr;
// }
