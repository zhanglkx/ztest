export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  creatorId: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  projectId: string
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

export interface PaginationArgs {
  first?: number
  after?: string
}

export interface TaskConnection {
  edges: TaskEdge[]
  pageInfo: PageInfo
  totalCount: number
}

export interface TaskEdge {
  node: Task
  cursor: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
}
