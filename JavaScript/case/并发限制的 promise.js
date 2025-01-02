async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = [];
    const executing = [];

    for (const item of array) {
        const p = Promise.resolve().then(() => iteratorFn(item));
        ret.push(p);

        if (poolLimit <= array.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
}

const poolLimit = async (poolLimit, array, iteratorFn) => {

    const ret = []
    const executing = []

    for (const item of array) {
        const p = Promise.resolve().then(() => iteratorFn(item))
        ret.push(p)

        if (poolLimit <= array.length) {

            const e = Promise.resolve().then(() => executing.splice(executing.indexOf(e), 1))
            executing.push(p)

            if (executing >= poolLimit) {
                await Promise.race(executing)
            }

        }
    }

    return Promise.all(ret)

}

// 模拟 API 请求函数
const fetchUserData = async (userId) => {
    // 模拟 API 延迟
    const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3秒随机延迟
    try {
        // 模拟 API 调用
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模拟成功率 80%
                if (Math.random() < 0.8) {
                    resolve({
                        userId,
                        username: `User${userId}`,
                        email: `user${userId}@example.com`,
                        lastLogin: new Date().toISOString()
                    });
                } else {
                    reject(new Error(`Failed to fetch user ${userId}`));
                }
            }, delay);
        });

        console.log(`✅ Successfully fetched user ${userId} data`);
        return response;
    } catch (error) {
        console.error(`❌ Error fetching user ${userId}:`, error.message);
        throw error;
    }
};

// 使用示例
const userIds = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008];

console.log('开始获取用户数据，并发限制为3...');
console.time('Total fetch time');

asyncPool(3, userIds, fetchUserData)
    .then(results => {
        console.timeEnd('Total fetch time');
        console.log('所有用户数据:', results);
    })
    .catch(error => {
        console.timeEnd('Total fetch time');
        console.error('部分请求失败:', error);
    });
