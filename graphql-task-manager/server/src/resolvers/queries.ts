import { dataStore } from '../data/store'
import { TaskFilters, TaskSort, PaginationArgs, TaskConnection, TaskEdge, PageInfo } from '../types'

export const queries = {
  // User queries
  users: () => {
    return dataStore.getUsers()
  },

  user: (_: any, { id }: { id: string }) => {
    return dataStore.getUserById(id)
  },

  // Project queries
  projects: () => {
    return dataStore.getProjects()
  },

  project: (_: any, { id }: { id: string }) => {
    return dataStore.getProjectById(id)
  },

  userProjects: (_: any, { userId }: { userId: string }) => {
    return dataStore.getProjectsByUserId(userId)
  },

  // Task queries
  tasks: (_: any, args: {
    filters?: TaskFilters
    sort?: TaskSort
    first?: number
    after?: string
  }) => {
    let tasks = dataStore.getTasks()

    // 应用过滤器
    if (args.filters) {
      const { status, priority, assigneeId, projectId } = args.filters
      
      if (status) {
        tasks = tasks.filter(task => task.status === status)
      }
      if (priority) {
        tasks = tasks.filter(task => task.priority === priority)
      }
      if (assigneeId) {
        tasks = tasks.filter(task => task.assigneeId === assigneeId)
      }
      if (projectId) {
        tasks = tasks.filter(task => task.projectId === projectId)
      }
    }

    // 应用排序
    if (args.sort) {
      const { field, direction } = args.sort
      tasks.sort((a, b) => {
        let aValue: any = a[field]
        let bValue: any = b[field]

        // 处理日期字段
        if (field === 'createdAt' || field === 'updatedAt') {
          aValue = new Date(aValue).getTime()
          bValue = new Date(bValue).getTime()
        }

        // 处理优先级排序
        if (field === 'priority') {
          const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'URGENT': 4 }
          aValue = priorityOrder[aValue as keyof typeof priorityOrder]
          bValue = priorityOrder[bValue as keyof typeof priorityOrder]
        }

        if (aValue < bValue) return direction === 'ASC' ? -1 : 1
        if (aValue > bValue) return direction === 'ASC' ? 1 : -1
        return 0
      })
    }

    // 应用分页
    const totalCount = tasks.length
    let startIndex = 0
    
    if (args.after) {
      const afterIndex = tasks.findIndex(task => task.id === args.after)
      startIndex = afterIndex >= 0 ? afterIndex + 1 : 0
    }

    const first = args.first || 10
    const endIndex = Math.min(startIndex + first, tasks.length)
    const paginatedTasks = tasks.slice(startIndex, endIndex)

    // 构建连接结果
    const edges: TaskEdge[] = paginatedTasks.map(task => ({
      node: task,
      cursor: task.id
    }))

    const pageInfo: PageInfo = {
      hasNextPage: endIndex < totalCount,
      hasPreviousPage: startIndex > 0,
      startCursor: edges.length > 0 ? edges[0].cursor : undefined,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : undefined
    }

    const connection: TaskConnection = {
      edges,
      pageInfo,
      totalCount
    }

    return connection
  },

  task: (_: any, { id }: { id: string }) => {
    return dataStore.getTaskById(id)
  },

  projectTasks: (_: any, { projectId }: { projectId: string }) => {
    return dataStore.getTasksByProjectId(projectId)
  },

  userTasks: (_: any, { userId }: { userId: string }) => {
    return dataStore.getTasksByUserId(userId)
  }
}
