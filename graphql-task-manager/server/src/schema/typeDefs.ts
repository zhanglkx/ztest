export const typeDefs = `#graphql
  enum UserRole {
    ADMIN
    MANAGER
    DEVELOPER
  }

  enum ProjectStatus {
    PLANNING
    IN_PROGRESS
    COMPLETED
    ON_HOLD
  }

  enum TaskStatus {
    TODO
    IN_PROGRESS
    IN_REVIEW
    COMPLETED
  }

  enum TaskPriority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }

  enum SortDirection {
    ASC
    DESC
  }

  enum TaskSortField {
    createdAt
    updatedAt
    priority
    title
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
    createdAt: String!
    projects: [Project!]!
    assignedTasks: [Task!]!
  }

  type Project {
    id: ID!
    title: String!
    description: String!
    status: ProjectStatus!
    creator: User!
    createdAt: String!
    updatedAt: String!
    tasks: [Task!]!
    taskCount: Int!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: TaskStatus!
    priority: TaskPriority!
    assignee: User!
    project: Project!
    createdAt: String!
    updatedAt: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type TaskEdge {
    node: Task!
    cursor: String!
  }

  type TaskConnection {
    edges: [TaskEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input TaskFilters {
    status: TaskStatus
    priority: TaskPriority
    assigneeId: ID
    projectId: ID
  }

  input TaskSort {
    field: TaskSortField!
    direction: SortDirection!
  }

  input CreateUserInput {
    name: String!
    email: String!
    role: UserRole!
  }

  input UpdateUserInput {
    name: String
    email: String
    role: UserRole
  }

  input CreateProjectInput {
    title: String!
    description: String!
    creatorId: ID!
  }

  input UpdateProjectInput {
    title: String
    description: String
    status: ProjectStatus
  }

  input CreateTaskInput {
    title: String!
    description: String!
    priority: TaskPriority!
    assigneeId: ID!
    projectId: ID!
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: TaskStatus
    priority: TaskPriority
    assigneeId: ID
  }

  type Query {
    # User queries
    users: [User!]!
    user(id: ID!): User
    
    # Project queries
    projects: [Project!]!
    project(id: ID!): Project
    userProjects(userId: ID!): [Project!]!
    
    # Task queries
    tasks(
      filters: TaskFilters
      sort: TaskSort
      first: Int
      after: String
    ): TaskConnection!
    task(id: ID!): Task
    projectTasks(projectId: ID!): [Task!]!
    userTasks(userId: ID!): [Task!]!
  }

  type Mutation {
    # User mutations
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    
    # Project mutations
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
    
    # Task mutations
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!
    updateTaskStatus(id: ID!, status: TaskStatus!): Task!
  }

  type Subscription {
    taskCreated: Task!
    taskUpdated: Task!
    taskDeleted: ID!
    projectUpdated: Project!
  }
`;
