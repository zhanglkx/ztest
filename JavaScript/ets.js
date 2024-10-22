// 写一个 nodejs 脚本

// 输入一个字符串，输出一个字符串，字符串中每个字符的 ASCII 码都加 1
// 例如输入 "abc"，输出 "bcd"
// 例如输入 "xyz"，输出 "yza"
// 例如输入 "ABC"，输出 "BCD"
// 例如输入 "XYZ"，输出 "YZA"

function addOne(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) + 1);
    }
    return result;
}

console.log(addOne("abc"));