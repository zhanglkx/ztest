class PromisePool {
    constructor(max) {
        this.max = max; // 最大并发数
        this.running = 0; // 当前运行的任务数
        this.queue = []; // 等待执行的任务队列
    }

    add(fn) {
        return new Promise((resolve, reject) => {
            const task = {
                fn,
                resolve,
                reject
            };

            if (this.running < this.max) {
                this.run(task);
            } else {
                this.queue.push(task);
            }
        });
    }

    run(task) {
        this.running++;
        task.fn()
            .then(result => {
                task.resolve(result);
            })
            .catch(err => {
                task.reject(err);
            })
            .finally(() => {
                this.running--;
                if (this.queue.length > 0) {
                    this.run(this.queue.shift());
                }
            });
    }
}

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

async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务

    for (const item of array) {
        // 调用iteratorFn创建异步任务
        const p = Promise.resolve().then(() => iteratorFn(item));
        ret.push(p);

        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if (poolLimit <= array.length) {
            // 当任务完成后，从executing数组中移除已完成的任务
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
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
