var longestPalindrome = function (s) {
    // 存储最长回文子串
    let maxLenStr = '';
    // 用于优化搜索范围的安全长度
    let safeLen = 0;

    // 中心扩展递归函数
    const getMaxLoop = (ele, j, i) => {
        // 终止条件：
        // 1. 超出安全搜索长度
        // 2. 左指针越界
        // 3. 右指针越界
        if (safeLen < Math.floor((i - j + 1) / 2) || j < 0 || i > s.length - 1) {
            return maxLenStr;
        }
        // 如果两端字符相等，继续扩展
        else if (s[i] == s[j]) {
            // 更新最长回文子串
            maxLenStr = Math.max(maxLenStr.length, i - j + 1) > maxLenStr.length
                ? s.slice(j, i + 1)
                : maxLenStr;
            // 向两边扩展
            i++;
            j--;
            getMaxLoop(ele, j, i);
        }
        // 两端字符不等，返回当前结果
        else {
            return maxLenStr;
        }
    }

    // 遍历每个可能的中心点
    for (let index = 0; index < s.length; index++) {
        const element = s[index];
        // 计算当前位置的安全搜索长度
        safeLen = Math.min(index + 1, s.length - index);

        // 检查偶数长度回文串
        if (s[index] == s[index + 1]) {
            getMaxLoop(element, index, index + 1);
        }
        // 检查奇数长度回文串
        getMaxLoop(element, index, index);
    }

    return maxLenStr;
};

const s = "aaaa"

console.log('🚀日志=====', longestPalindrome(s));