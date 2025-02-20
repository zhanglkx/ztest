 const replaceSharkStrOrder = (template, subStrings) => {
  if (!Array.isArray(subStrings)) {
    subStrings = [subStrings];
  }

  return template.replace(/%(\d+)\$s/g, (match, index) => {
    const valueIndex = parseInt(index, 10) - 1;
    if (valueIndex >= 0 && valueIndex < subStrings.length) {
      return subStrings[valueIndex];
    }
    // 如果索引超出范围，保留原始匹配项
    return match;
  });
};

// 示例 1: 使用单个字符串作为替换值
// const template1 = 'Hello, %1$s!  , %2$s!';
// const subString1 = 'World';
// const result1 = replaceSharkStrOrder(template1, [subString1, '1']);
// console.log(result1); // 输出: Hello, World!

// 示例 2: 使用字符串数组作为替换值
const template2 = 'My name is %1$s and I am %2$s years old.';
const subStrings2 = ['John', '30'];
const result2 = replaceSharkStrOrder(template2, subStrings2);
console.log(result2); // 输出: My name is John and I am 30 years old.

// // 示例 3: 索引超出范围，保留原始匹配项
// const template3 = 'This is %1$s and %2$s.';
// const subStrings3 = ['apple'];
// const result3 = replaceSharkStrOrder(template3, subStrings3);
// console.log(result3); // 输出: This is apple and %2$s.
