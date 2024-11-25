
// function solution(cards) {

//     let arr = []

//     for (let index = 0; index < cards.length; index++) {
//         if (arr.includes(cards[index])) {
//             arr = arr.filter(item => item !== cards[index]);
//         } else {
//             arr.push(cards[index])

//         }
//     }

//     return arr[0];
// }

function solution(cards) {
    let result = 0;
    for (let num of cards) {
        result ^= num;
        console.log('🚀日志=====', result);
    }
    return result;
}


function main() {
    // Add your test cases here
    console.log(solution([1, 1, 2, 2, 3, 3, 4, 5, 5]) === 4);
    console.log(solution([0, 1, 0, 1, 2]) === 2);
}

main();
