// import { fileURLToPath } from 'url'
// import { dirname } from 'path'
// import { createRequire } from 'module'



// console.log('🚀日志=====name', name);

// console.log('🚀日志=====', package1);

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// console.log('__filename', __filename)
// console.log('__dirname', __dirname)

// // 使用 require 函数加载 package.json 文件
// console.log('name', package1.name)
// 导入 package.json 文件，使用 require 函数
// const package1 = createRequire(import.meta.url)('../package.json')

const name = require('../package.json')
console.log('🚀日志=====name', name);
debugger
// console.log('🚀日志=====name', global); 
console.log(Object.getOwnPropertyNames(global))
