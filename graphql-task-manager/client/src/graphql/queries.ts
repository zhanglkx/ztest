import { gql } from '@apollo/client';

// User queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
      createdAt
      projects {
        id
        title
        status
        taskCount
      }
      assignedTasks {
        id
        title
        status
        priority
        project {
          title
        }
      }
    }
  }
`;

// Project queries
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      status
      creator {
        id
        name
      }
      taskCount
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      description
      status
      creator {
        id
        name
      }
      tasks {
        id
        title
        status
        priority
        assignee {
          name
        }
      }
      taskCount
      createdAt
      updatedAt
    }
  }
`;

// Task queries
export const GET_TASKS = gql`
  query GetTasks(
    $filters: TaskFilters
    $sort: TaskSort
    $first: Int
    $after: String
  ) {
    tasks(filters: $filters, sort: $sort, first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          status
          priority
          assignee {
            id
            name
          }
          project {
            id
            title
          }
          createdAt
          updatedAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      priority
      assignee {
        id
        name
      }
      project {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;