// 使用 esmodule 语法读取文件
// 导入文件
import { readFileSync } from 'fs';
// 读取文件
const file = readFileSync('./tempCodeRunnerFile.js', 'utf-8');

console.log('🚀日志=====', file);

// 定义一个函数，将输入的字符串转换为数组
function strToArr(str) {
    // 定义一个数组，用于存储转换后的结果
    const arr = [];
    // 定义一个变量，用于存储当前的数字
    let num = '';
    // 遍历字符串
    for (let i = 0; i < str.length; i++) {  
        // 如果当前字符是数字
        if (str[i] >= '0' && str[i] <= '9') {
            // 将当前字符添加到数字中
            num += str[i];
        } else {
            // 如果当前字符不是数字
            // 如果数字不为空
            if (num !== '') {
                // 将数字转换为数字类型
                num = parseInt(num);
                // 将数字添加到数组中
                arr.push(num);
                // 将数字清空
                num = '';
            }
        }
    }
    // 如果数字不为空
    if (num!== '') {
        // 将数字转换为数字类型
        num = parseInt(num);
        // 将数字添加到数组中
        arr.push(num);
    }
    // 返回数组
    return arr;
}