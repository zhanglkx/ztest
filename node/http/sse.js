const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    // 设置 SSE 所需的响应头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });

    // 模拟流式响应的文本
    const message =
      'Hello! This is a streaming response similar to ChatGPT. Let me explain how SSE works step by step...我已经创建了一个完整的 SSE 示例，包括服务器端和客户端实现。这个实现模拟了类似 ChatGPT 的流式响应效果。让我解释一下关键部分';
    let index = 0;

    

    // 每隔一小段时间发送一个字符
    const interval = setInterval(() => {
      if (index < message.length) {
        // 发送数据
        res.write(`data: ${message[index]}\n\n`);
        index++;
      } else {
        // 发送结束标记
        res.write('data: [DONE]\n\n');
        clearInterval(interval);
      }
    }, 100);

    // 监听连接关闭
    req.on('close', () => {
      clearInterval(interval);
    });
  } else {
    // 处理其他路由
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
