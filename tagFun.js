// let a = 1, b = 2;
// function tagFun(str, ste1, str2, str3) {
//     console.log({ str, ste1, str2, str3 });
//     return str + ste1 + str2 + str3;
// }
// let res = tagFun`${a}+${b}=${a + b}`
// console.log({ res });

function format(strings, ...values) {
    console.log({ strings, values });
    return strings.reduce((result, string, i) => {
        return `${result}${string}${values[i] || ''}`;
    }, '');
}

const name = 'Alice';
const messages = 5;

const result = format`Hello ${name}, you have ${messages} new messages.`;
console.log(result);  // 输出：Hello Alice, you have 5 new messages.
