class poolLimit {
    constructor(max) {
        this.max = max; // 最大并发数
        this.running = 0; // 当前运行的任务数
        this.queue = []; // 等待执行的任务队列
    }

    add(fn) {
        return new Promise((resolve, reject) => {
            const task = {
                fn, resolve, reject
            }
            if (this.running < this.max) {
                this.queue.push(task)
            } else {
                this.run(task)
            }
        })
    }

    run(task) {
        task.fn()
            .then(res => {
                task.resolve(res)
            })
            .catch(err => {
                task.reject(err)
            })
            .finally(() => {
                this.run--
                if (this.queue.length > 0) {
                    this.run(this.queue.shift())
                }
            })
    }


}


async function poolLimit(max, tasks, iterator) {

    const run = []
    const executing = []

    for (const item of tasks) {
        const p = Promise.resolve().then(() => iterator(item))
        run.push(p)

        const e = p.then(() => executing.splice(executing.indexOf(e), 1))
        executing.push(p)
        if (condition) {
            await Promise.race(executing)
        }
    }

}