const http = require("http");

http
  .createServer((request, response) => {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { "Content-Type": "text/plain" });

    // 发送响应数据 "Hello World"
    response.end("Hello World\n");
  })
  .listen(8888);

/**
 * 
 * const http = require('http');：导入 Node.js 内置的 http 模块。
http.createServer((req, res) => { ... });：创建一个新的 HTTP 服务器，每次有请求时都会执行回调函数。
res.writeHead(200, { 'Content-Type': 'text/plain' });：设置响应状态码和内容类型。
res.end('Hello World\n');：结束响应并发送数据。
server.listen(PORT, () => { ... });：监听指定端口并在服务器启动后输出信息。
 */
