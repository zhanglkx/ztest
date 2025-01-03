import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js', '**/*.mjs', '**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021
            },
            sourceType: 'module',
            ecmaVersion: 'latest',
        },
        rules: {
            // 可能的错误
            'no-console': 'warn', // 警告使用console
            'no-debugger': 'warn', // 警告使用debugger
            'no-dupe-args': 'error', // 禁止function参数重名
            'no-dupe-keys': 'error', // 禁止对象属性重名
            'no-duplicate-case': 'error', // 禁止switch中重复case
            'no-empty': 'warn', // 警告空的代码块
            'no-extra-semi': 'error', // 禁止不必要的分号
            'no-func-assign': 'error', // 禁止函数重新赋值
            'no-unreachable': 'error', // 禁止出现无法执行到的代码

            // 最佳实践
            'eqeqeq': ['error', 'always'], // 要求使用 === 和 !==
            'no-eval': 'error', // 禁用 eval()
            'no-implied-eval': 'error', // 禁止使用隐式eval
            'no-multi-spaces': 'error', // 禁止使用多个空格
            'no-useless-return': 'error', // 禁止多余的return

            // 变量声明
            'no-unused-vars': 'warn', // 警告未使用的变量
            'no-use-before-define': 'error', // 禁止在变量定义前使用

            // 代码风格
            'array-bracket-spacing': ['error', 'never'], // 数组方括号前后的空格使用规则
            'block-spacing': 'error', // 代码块前后需要空格
            'brace-style': 'error', // 大括号风格要求
            'comma-spacing': ['error', { 'before': false, 'after': true }], // 逗号前后的空格使用规则
            'indent': 'off', // 关闭 ESLint 的缩进检查，使用编辑器的格式化
            'quotes': ['error', 'single'], // 使用单引号
            'semi': ['error', 'always'], // 要求使用分号

            // ES6
            'arrow-spacing': 'error', // 箭头函数的箭头前后需要空格
            'no-var': 'error', // 要求使用 let 或 const 而不是 var
            'prefer-const': 'error', // 要求使用 const 声明那些声明后不再被修改的变量
            'prefer-template': 'error', // 建议使用模板字面量而非字符串连接
        }
    }
];