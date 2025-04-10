// 安全序列化函数（处理循环引用和非常规类型）
const safeStringify = (obj, space = 2) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (k, v) => {
    if (typeof v === 'function') return '[Function]';
    if (typeof v === 'symbol') return '[Symbol]';
    if (v instanceof Node) return '[DOM Node]';
    if (typeof v === 'object' && v !== null) {
      if (seen.has(v)) return '[Circular]';
      seen.add(v);
    }
    return v;
  }, space);
};

// 获取调用堆栈的干净信息
const getCleanStack = (depth = 3) => {
  try {
    const stack = new Error().stack.split('\n');
    return stack
      .slice(3, 3 + depth) // 跳过自身调用层
      .map(line => line.replace(/\s+at\s+/, ''))
      .join(' | ');
  } catch (e) {
    return 'stack_unavailable';
  }
};

// 高阶函数装饰器
const withCodeUsageTrack = (options = {}) => (targetFunc) => {
  const funcName = targetFunc.name || 'anonymous';
  
  return function(...args) {
    const startTime = Date.now();
    let result;
    
    try {
      result = targetFunc.apply(this, args);
    } finally {
      const duration = Date.now() - startTime;
      
      // 环境判断（生产环境减少日志量）
      if (process.env.NODE_ENV === 'production' && Math.random() > 0.1) return;
      
      try {
        const stackTrace = getCleanStack();
        const location = stackTrace.split(' | ')[0] || 'unknown';
        
        devLogTrace({
          key: 'code_usage_tracker',
          value: {
            logType: 'info',
            warningCode: 'CODE_USAGE_STATS',
            level: 'p4',
            desc: `代码使用追踪 - ${funcName}`,
            extend: {
              funcName,
              params: safeStringify(args),
              executionTime: `${duration}ms`,
              location, // 调用位置
              stack: stackTrace,
              file: location.match(/\((.*):\d+:\d+\)/)?.[1] || 'unknown',
              timestamp: new Date().toISOString(),
              env: process.env.NODE_ENV,
              appVersion: process.env.REACT_APP_VERSION,
              ...options.customData
            }
          }
        });
      } catch (loggingError) {
        console.error('埋点上报失败:', loggingError);
      }
    }
    
    return result;
  };
};