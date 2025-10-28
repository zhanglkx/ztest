import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import { json } from 'body-parser';

import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';

async function startServer() {
  // 创建Express应用
  const app = express();
  const httpServer = createServer(app);

  // 创建可执行的GraphQL schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // 创建WebSocket服务器用于订阅
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // 设置WebSocket服务器
  const serverCleanup = useServer({ schema }, wsServer);

  // 创建Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      // 正确关闭HTTP服务器的插件
      ApolloServerPluginDrainHttpServer({ httpServer }),
      
      // 正确关闭WebSocket服务器的插件
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // 启动Apollo Server
  await server.start();

  // 设置中间件
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  const PORT = process.env.PORT || 4000;

  // 启动HTTP服务器
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

// 启动服务器
startServer().catch((error) => {
  console.error('Error starting server:', error);
});
