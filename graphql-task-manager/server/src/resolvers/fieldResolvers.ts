import { dataStore } from '../data/store'
import { User, Project, Task } from '../types'

export const fieldResolvers = {
  User: {
    projects: (parent: User) => {
      return dataStore.getProjectsByUserId(parent.id)
    },
    
    assignedTasks: (parent: User) => {
      return dataStore.getTasksByUserId(parent.id)
    }
  },

  Project: {
    creator: (parent: Project) => {
      return dataStore.getUserById(parent.creatorId)
    },
    
    tasks: (parent: Project) => {
      return dataStore.getTasksByProjectId(parent.id)
    },
    
    taskCount: (parent: Project) => {
      return dataStore.getTasksByProjectId(parent.id).length
    }
  },

  Task: {
    assignee: (parent: Task) => {
      return dataStore.getUserById(parent.assigneeId)
    },
    
    project: (parent: Task) => {
      return dataStore.getProjectById(parent.projectId)
    }
  }
}
