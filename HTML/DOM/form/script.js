// 等待 DOM 完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取表单和表单元素的引用
    const form = document.getElementById('myForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const submitButton = form.querySelector('button[type="submit"]');

    // 定义各字段的验证规则
    const validations = {
        username: {
            required: true,
            minLength: 3,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_]+$/ // 只允许字母、数字和下划线
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // 基本的邮箱格式验证
        },
        password: {
            required: true,
            minLength: 8,
            // 密码必须包含至少一个大写字母、一个小写字母和一个数字
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        }
    };

    // 定义验证错误消息
    const errorMessages = {
        username: {
            required: 'Username is required',
            minLength: 'Username must be at least 3 characters',
            maxLength: 'Username must be less than 20 characters',
            pattern: 'Username can only contain letters, numbers and underscore'
        },
        email: {
            required: 'Email is required',
            pattern: 'Please enter a valid email address'
        },
        password: {
            required: 'Password is required',
            minLength: 'Password must be at least 8 characters',
            pattern: 'Password must contain at least one uppercase letter, one lowercase letter and one number'
        },
        confirmPassword: {
            match: 'Passwords do not match'
        }
    };

    /**
     * 验证单个输入字段
     * @param {HTMLInputElement} input - 输入元素
     * @param {Object} rules - 验证规则
     * @returns {Array} 错误消息数组
     */
    function validateInput(input, rules) {
        const value = input.value.trim();
        const errors = [];

        // 检查是否为必填字段
        if (rules.required && !value) {
            errors.push(errorMessages[input.name].required);
        }

        // 检查最小长度
        if (value && rules.minLength && value.length < rules.minLength) {
            errors.push(errorMessages[input.name].minLength);
        }

        // 检查最大长度
        if (value && rules.maxLength && value.length > rules.maxLength) {
            errors.push(errorMessages[input.name].maxLength);
        }

        // 检查正则表达式匹配
        if (value && rules.pattern && !rules.pattern.test(value)) {
            errors.push(errorMessages[input.name].pattern);
        }

        return errors;
    }

    /**
     * 显示或隐藏错误消息
     * @param {HTMLInputElement} input - 输入元素
     * @param {Array} errors - 错误消息数组
     */
    function showError(input, errors) {
        const errorElement = input.nextElementSibling;
        if (errors.length > 0) {
            // 显示错误状态和消息
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorElement.textContent = errors[0]; // 只显示第一个错误
        } else {
            // 显示有效状态
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorElement.textContent = '';
        }
    }

    /**
     * 验证确认密码是否匹配
     * @returns {boolean} 验证是否通过
     */
    function validateConfirmPassword() {
        const errors = [];
        if (confirmPassword.value !== password.value) {
            errors.push(errorMessages.confirmPassword.match);
        }
        showError(confirmPassword, errors);
        return errors.length === 0;
    }

    // 为所有输入字段添加实时验证
    const inputs = [username, email, password];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const errors = validateInput(input, validations[input.name]);
            showError(input, errors);
            // 如果密码改变，同时验证确认密码
            if (input === password && confirmPassword.value) {
                validateConfirmPassword();
            }
            checkFormValidity();
        });
    });

    // 为确认密码字段添加实时验证
    confirmPassword.addEventListener('input', () => {
        validateConfirmPassword();
        checkFormValidity();
    });

    /**
     * 检查整个表单的有效性
     * 如果所有字段都有效，启用提交按钮
     */
    function checkFormValidity() {
        const isValid = inputs.every(input => {
            const errors = validateInput(input, validations[input.name]);
            return errors.length === 0;
        }) && validateConfirmPassword();

        submitButton.disabled = !isValid;
    }

    // 处理表单提交
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // 阻止表单默认提交

        // 验证所有输入字段
        let isValid = true;
        inputs.forEach(input => {
            const errors = validateInput(input, validations[input.name]);
            showError(input, errors);
            if (errors.length > 0) isValid = false;
        });

        // 验证确认密码
        if (!validateConfirmPassword()) {
            isValid = false;
        }

        // 如果所有验证通过，处理表单提交
        if (isValid) {
            console.log('Form submitted successfully!');
            alert('Form submitted successfully!');
            // 重置表单和验证状态
            form.reset();
            inputs.forEach(input => {
                input.classList.remove('valid');
            });
            confirmPassword.classList.remove('valid');
            submitButton.disabled = true;
        }
    });
}); 