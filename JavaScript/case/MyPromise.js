class MyPromise {
    constructor(executor) {
        this.initVale()
        this.initBind()
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    initVale() {
        this.promiseState = 'pending'
        this.promiseRes = null
    }

    initBind() {
        this.promiseState.bind(this)
        this.promiseRes.bind(this)
    }

    resolve(value) {
        if (this.promiseState === 'fulfilled') {
            return
        }
        this.promiseRes = value
        this.promiseState = 'fulfilled'
    }

    reject() {
        if (this.promiseState === 'rejected') {
            return
        }
        this.promiseRes = value
        this.promiseState = 'rejected'
    }

    then(res, rej) {

        const resFun = typeof rej === 'function' ? res : res => res
        const rej = typeof rej === 'function' ? rej : rej => rej


        if (this.promiseState === 'fulfilled') {
            resFun()
        } else {
            rej()
        }

    }
}