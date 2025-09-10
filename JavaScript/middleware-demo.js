// Next.js 中间件运行机制演示 (CommonJS版本)

// 模拟 NextResponse 对象
class MockNextResponse {
  static next() {
    console.log('✅ NextResponse.next() - 继续执行下一个中间件或路由处理器');
    return { type: 'next' };
  }
  
  static redirect(url) {
    console.log(`🔄 NextResponse.redirect(${url}) - 重定向到新URL`);
    return { type: 'redirect', url };
  }
  
  static rewrite(url) {
    console.log(`📝 NextResponse.rewrite(${url}) - 重写请求URL`);
    return { type: 'rewrite', url };
  }
}

// 模拟请求对象
class MockRequest {
  constructor(url) {
    this.url = url;
    this.headers = new Map();
    this.method = 'GET';
  }
}

// 中间件1：记录请求信息
async function middleware1(request) {
  console.log('🔍 中间件1执行中...');
  console.log(`📊 请求URL: ${request.url}`);
  console.log(`📊 请求方法: ${request.method}`);
  
  // 模拟一些处理逻辑
  if (request.url.includes('/admin')) {
    console.log('🚫 检测到管理员路径，需要权限验证');
    // 这里可以添加权限检查逻辑
  }
  
  console.log('✅ 中间件1执行完成');
  return MockNextResponse.next();
}

// 中间件2：添加自定义头部
async function middleware2(request) {
  console.log('🔍 中间件2执行中...');
  
  // 模拟添加自定义头部
  request.headers.set('X-Custom-Header', 'middleware-processed');
  console.log('📋 添加自定义头部: X-Custom-Header');
  
  // 模拟一些业务逻辑
  if (request.url.includes('/api/users')) {
    console.log('👥 检测到用户API请求，添加用户相关头部');
    request.headers.set('X-User-API', 'true');
  }
  
  console.log('✅ 中间件2执行完成');
  return MockNextResponse.next();
}

// 中间件3：错误处理
async function middleware3(request) {
  console.log('🔍 中间件3执行中...');
  
  // 模拟错误处理
  if (request.url.includes('/error')) {
    console.log('❌ 检测到错误路径，返回错误响应');
    return MockNextResponse.redirect('/error-page');
  }
  
  console.log('✅ 中间件3执行完成');
  return MockNextResponse.next();
}

// 主中间件函数 - 按顺序执行所有中间件
async function middleware(request) {
  console.log('🚀 开始执行中间件链...');
  console.log('='.repeat(50));
  
  try {
    // 按顺序执行中间件
    const result1 = await middleware1(request);
    if (result1.type !== 'next') {
      console.log('🛑 中间件1中断了执行链');
      return result1;
    }
    
    const result2 = await middleware2(request);
    if (result2.type !== 'next') {
      console.log('🛑 中间件2中断了执行链');
      return result2;
    }
    
    const result3 = await middleware3(request);
    if (result3.type !== 'next') {
      console.log('🛑 中间件3中断了执行链');
      return result3;
    }
    
    console.log('='.repeat(50));
    console.log('🎉 所有中间件执行完成，继续到路由处理器');
    return MockNextResponse.next();
    
  } catch (error) {
    console.error('❌ 中间件执行出错:', error);
    return MockNextResponse.redirect('/error');
  }
}

// 配置匹配器
const config = {
  matcher: '/api/:path*'
};

// 演示函数
function demonstrateMiddleware() {
  console.log('🎬 Next.js 中间件运行机制演示');
  console.log('='.repeat(60));
  
  // 测试不同的URL
  const testUrls = [
    '/api/users',
    '/api/admin/dashboard', 
    '/api/error',
    '/api/products'
  ];
  
  testUrls.forEach(url => {
    console.log(`\n🔗 测试URL: ${url}`);
    console.log('-'.repeat(40));
    
    const request = new MockRequest(url);
    middleware(request);
    
    console.log('\n');
  });
}

// 运行演示
demonstrateMiddleware();

// 导出供其他模块使用
module.exports = {
  middleware,
  middleware1,
  middleware2,
  middleware3,
  MockRequest,
  MockNextResponse,
  config
};
