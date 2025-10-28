import { dataStore } from '../data/store'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

// 订阅事件常量
export const TASK_CREATED = 'TASK_CREATED'
export const TASK_UPDATED = 'TASK_UPDATED'
export const TASK_DELETED = 'TASK_DELETED'
export const PROJECT_UPDATED = 'PROJECT_UPDATED'

export const mutations = {
  // User mutations
  createUser: (_: any, { input }: { input: any }) => {
    const user = dataStore.createUser(input)
    return user
  },

  updateUser: (_: any, { id, input }: { id: string; input: any }) => {
    const user = dataStore.updateUser(id, input)
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }
    return user
  },

  deleteUser: (_: any, { id }: { id: string }) => {
    const success = dataStore.deleteUser(id)
    if (!success) {
      throw new Error(`User with id ${id} not found`)
    }
    return success
  },

  // Project mutations
  createProject: (_: any, { input }: { input: any }) => {
    const project = dataStore.createProject(input)
    return project
  },

  updateProject: async (_: any, { id, input }: { id: string; input: any }) => {
    const project = dataStore.updateProject(id, input)
    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }
    
    // 发布项目更新事件
    await pubsub.publish(PROJECT_UPDATED, { projectUpdated: project })
    
    return project
  },

  deleteProject: (_: any, { id }: { id: string }) => {
    const success = dataStore.deleteProject(id)
    if (!success) {
      throw new Error(`Project with id ${id} not found`)
    }
    return success
  },

  // Task mutations
  createTask: async (_: any, { input }: { input: any }) => {
    // 验证分配者和项目是否存在
    const assignee = dataStore.getUserById(input.assigneeId)
    if (!assignee) {
      throw new Error(`User with id ${input.assigneeId} not found`)
    }

    const project = dataStore.getProjectById(input.projectId)
    if (!project) {
      throw new Error(`Project with id ${input.projectId} not found`)
    }

    const task = dataStore.createTask({
      ...input,
      status: 'TODO' // 新任务默认为TODO状态
    })

    // 发布任务创建事件
    await pubsub.publish(TASK_CREATED, { taskCreated: task })

    return task
  },

  updateTask: async (_: any, { id, input }: { id: string; input: any }) => {
    // 如果更新分配者，验证用户是否存在
    if (input.assigneeId) {
      const assignee = dataStore.getUserById(input.assigneeId)
      if (!assignee) {
        throw new Error(`User with id ${input.assigneeId} not found`)
      }
    }

    const task = dataStore.updateTask(id, input)
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }

    // 发布任务更新事件
    await pubsub.publish(TASK_UPDATED, { taskUpdated: task })

    return task
  },

  updateTaskStatus: async (_: any, { id, status }: { id: string; status: string }) => {
    const task = dataStore.updateTask(id, { status })
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }

    // 发布任务更新事件
    await pubsub.publish(TASK_UPDATED, { taskUpdated: task })

    return task
  },

  deleteTask: async (_: any, { id }: { id: string }) => {
    const success = dataStore.deleteTask(id)
    if (!success) {
      throw new Error(`Task with id ${id} not found`)
    }

    // 发布任务删除事件
    await pubsub.publish(TASK_DELETED, { taskDeleted: id })

    return success
  }
}

export { pubsub }
