import { gql } from '@apollo/client';

export const TASK_CREATED_SUBSCRIPTION = gql`
  subscription TaskCreated {
    taskCreated {
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

export const TASK_UPDATED_SUBSCRIPTION = gql`
  subscription TaskUpdated {
    taskUpdated {
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

export const TASK_DELETED_SUBSCRIPTION = gql`
  subscription TaskDeleted {
    taskDeleted
  }
`;

export const PROJECT_UPDATED_SUBSCRIPTION = gql`
  subscription ProjectUpdated {
    projectUpdated {
      id
      title
      description
      status
      creator {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;
