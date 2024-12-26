
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {

    let maxLenStr = ''
    let safeLen = 0

    const getMaxLoop = (ele, j, i) => {

        if (safeLen < Math.floor((i - j + 1) / 2) || j < 0 || i > s.length - 1) {
            return maxLenStr
        } else if (s[i] == s[j]) {

            maxLenStr = Math.max(maxLenStr.length, i - j + 1) > maxLenStr.length ? s.slice(j, i + 1) : maxLenStr
            i++
            j--
            getMaxLoop(ele, j, i)
        } else {
            return maxLenStr
        }
    }

    for (let index = 0; index < s.length; index++) {
        const element = s[index];
        safeLen = Math.min(index + 1, s.length - index)

        if (s[index] == s[index + 1]) {
            getMaxLoop(element, index, index + 1)
        }
        getMaxLoop(element, index, index)

    }

    return maxLenStr

};

const s = "aaaa"

console.log('🚀日志=====', longestPalindrome(s));