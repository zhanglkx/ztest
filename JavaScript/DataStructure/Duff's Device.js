// 示例数组
let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// 假设 values.length > 0
let iterations = Math.ceil(values.length / 8);
let startAt = values.length % 8;
let i = 0;

// 示例处理函数
function process(value) {
    console.log("Processing value:", value);
}

do {
    switch (startAt) {
        case 0: process(values[i++]);
        case 7: process(values[i++]);
        case 6: process(values[i++]);
        case 5: process(values[i++]);
        case 4: process(values[i++]);
        case 3: process(values[i++]);
        case 2: process(values[i++]);
        case 1: process(values[i++]);
    }
    startAt = 0;
} while (--iterations > 0);
