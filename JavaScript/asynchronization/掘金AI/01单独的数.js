
function solution(cards) {

    let res = 0

    for (let index = 0; index < cards.length; index++) {
        res ^= cards[index]
    }
    return res;
}

function main() {
    // Add your test cases here
    console.log(solution([1, 1, 2, 2, 3, 3, 4, 5, 5]) === 4);
    console.log(solution([0, 1, 0, 1, 2]) === 2);
}

main();
