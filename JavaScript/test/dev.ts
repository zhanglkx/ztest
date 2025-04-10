function trackUsage(key, options = {}) {
  // 获取调用栈信息（跳过当前函数和调用trackUsage的函数）
  const stack = new Error().stack.split('\n').slice(3);
  const callerFrame = stack[0];
  const methodName = callerFrame.match(/at (.*?)\s*\(/)?.[1] || 'unknown';

  // 收集基本信息
  const logData = {
    logType: 'usage',
    method: methodName,
    stack: stack.join('\n'),
    timestamp: Date.now(),
    ...options,
  };

  // 调用你的日志函数
  devLogTrace({
    key,
    value: logData,
  });
}

// 示例：在某个方法中插入埋点
function someMethod(params) {
  trackUsage('c_wallet_no_token', {
    warningCode: 'wallet_unused_code_Tag',
    level: 'p4',
    desc: '前端 cq 项目未使用代码治理埋点，告警请忽略',
    params: JSON.stringify(params),
  });

  // 原始代码逻辑
  // ...
}