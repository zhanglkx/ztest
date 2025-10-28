import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
// @ts-ignore
import App from './App'
import './index.css'

// HTTP链接用于查询和变更
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

// WebSocket链接用于订阅
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}))

// 根据操作类型分割链接
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

// 创建Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tasks: {
            // 合并分页结果
            keyArgs: ['filters', 'sort'],
            merge(existing = { edges: [], pageInfo: {}, totalCount: 0 }, incoming) {
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              }
            },
          },
        },
      },
    },
  }),
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
