export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  projects?: Project[]
  assignedTasks?: Task[]
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  creator: User
  createdAt: string
  updatedAt: string
  tasks?: Task[]
  taskCount?: number
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: User
  project: Project
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER'
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD'
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface TaskFilters {
  status?: TaskStatus
  priority?: TaskPriority
  assigneeId?: string
  projectId?: string
}

export interface TaskSort {
  field: 'createdAt' | 'updatedAt' | 'priority' | 'title'
  direction: 'ASC' | 'DESC'
}
