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

function solution(s: string): string {
  // 分割整数部分和小数部分
  const [integerPart, decimalPart] = s.split(".");

  // 去除整数部分的前导零
  const cleanedIntegerPart = integerPart.replace(/^0+/, "");

  // 使用正则表达式进行千分位格式化
  const formattedIntegerPart = cleanedIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 拼接整数部分和小数部分
  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}

function main() {
  console.log(solution("1294512.12412") === "1,294,512.12412");
  console.log(solution("0000123456789.99") === "123,456,789.99");
  console.log(solution("987654321") === "987,654,321");
}

main();
