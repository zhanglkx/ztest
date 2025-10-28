import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { User, Project, Task, UserRole, ProjectStatus, TaskStatus, TaskPriority } from '../types'

const DATA_DIR = join(__dirname, 'json')
const USERS_FILE = join(DATA_DIR, 'users.json')
const PROJECTS_FILE = join(DATA_DIR, 'projects.json')
const TASKS_FILE = join(DATA_DIR, 'tasks.json')

// 确保数据目录存在
import { mkdirSync } from 'fs'
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true })
}

class DataStore {
  private users: User[] = []
  private projects: Project[] = []
  private tasks: Task[] = []

  constructor() {
    this.loadData()
    this.initializeDefaultData()
  }

  private loadData() {
    try {
      if (existsSync(USERS_FILE)) {
        this.users = JSON.parse(readFileSync(USERS_FILE, 'utf-8'))
      }
      if (existsSync(PROJECTS_FILE)) {
        this.projects = JSON.parse(readFileSync(PROJECTS_FILE, 'utf-8'))
      }
      if (existsSync(TASKS_FILE)) {
        this.tasks = JSON.parse(readFileSync(TASKS_FILE, 'utf-8'))
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  private saveData() {
    try {
      writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2))
      writeFileSync(PROJECTS_FILE, JSON.stringify(this.projects, null, 2))
      writeFileSync(TASKS_FILE, JSON.stringify(this.tasks, null, 2))
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  private initializeDefaultData() {
    if (this.users.length === 0) {
      const defaultUsers: User[] = [
        {
          id: uuidv4(),
          name: '张三',
          email: 'zhangsan@example.com',
          role: UserRole.ADMIN,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: '李四',
          email: 'lisi@example.com',
          role: UserRole.MANAGER,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: '王五',
          email: 'wangwu@example.com',
          role: UserRole.DEVELOPER,
          createdAt: new Date().toISOString()
        }
      ]
      this.users = defaultUsers
    }

    if (this.projects.length === 0 && this.users.length > 0) {
      const defaultProjects: Project[] = [
        {
          id: uuidv4(),
          title: '任务管理系统',
          description: '开发一个基于GraphQL的任务管理系统',
          status: ProjectStatus.IN_PROGRESS,
          creatorId: this.users[0].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          title: '移动端应用',
          description: '开发配套的移动端应用',
          status: ProjectStatus.PLANNING,
          creatorId: this.users[1].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      this.projects = defaultProjects
    }

    if (this.tasks.length === 0 && this.projects.length > 0 && this.users.length > 0) {
      const defaultTasks: Task[] = [
        {
          id: uuidv4(),
          title: '设计数据库结构',
          description: '设计用户、项目、任务的数据库表结构',
          status: TaskStatus.COMPLETED,
          priority: TaskPriority.HIGH,
          assigneeId: this.users[2].id,
          projectId: this.projects[0].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          title: '实现GraphQL Schema',
          description: '定义GraphQL的类型和查询',
          status: TaskStatus.IN_PROGRESS,
          priority: TaskPriority.HIGH,
          assigneeId: this.users[2].id,
          projectId: this.projects[0].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          title: '开发前端界面',
          description: '使用React开发用户界面',
          status: TaskStatus.TODO,
          priority: TaskPriority.MEDIUM,
          assigneeId: this.users[1].id,
          projectId: this.projects[0].id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      this.tasks = defaultTasks
    }

    this.saveData()
  }

  // User methods
  getUsers(): User[] {
    return this.users
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id)
  }

  createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const user: User = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    }
    this.users.push(user)
    this.saveData()
    return user
  }

  updateUser(id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...userData }
    this.saveData()
    return this.users[userIndex]
  }

  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    this.users.splice(userIndex, 1)
    this.saveData()
    return true
  }

  // Project methods
  getProjects(): Project[] {
    return this.projects
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id)
  }

  getProjectsByUserId(userId: string): Project[] {
    return this.projects.filter(project => project.creatorId === userId)
  }

  createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const project: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.projects.push(project)
    this.saveData()
    return project
  }

  updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'creatorId'>>): Project | null {
    const projectIndex = this.projects.findIndex(project => project.id === id)
    if (projectIndex === -1) return null

    this.projects[projectIndex] = {
      ...this.projects[projectIndex],
      ...projectData,
      updatedAt: new Date().toISOString()
    }
    this.saveData()
    return this.projects[projectIndex]
  }

  deleteProject(id: string): boolean {
    const projectIndex = this.projects.findIndex(project => project.id === id)
    if (projectIndex === -1) return false

    // 删除相关任务
    this.tasks = this.tasks.filter(task => task.projectId !== id)
    this.projects.splice(projectIndex, 1)
    this.saveData()
    return true
  }

  // Task methods
  getTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id)
  }

  getTasksByProjectId(projectId: string): Task[] {
    return this.tasks.filter(task => task.projectId === projectId)
  }

  getTasksByUserId(userId: string): Task[] {
    return this.tasks.filter(task => task.assigneeId === userId)
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const task: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.tasks.push(task)
    this.saveData()
    return task
  }

  updateTask(id: string, taskData: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) return null

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString()
    }
    this.saveData()
    return this.tasks[taskIndex]
  }

  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) return false

    this.tasks.splice(taskIndex, 1)
    this.saveData()
    return true
  }
}

export const dataStore = new DataStore()
