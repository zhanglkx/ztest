import { pubsub, TASK_CREATED, TASK_UPDATED, TASK_DELETED, PROJECT_UPDATED } from './mutations';

export const subscriptions = {
  taskCreated: {
    subscribe: () => pubsub.asyncIterator([TASK_CREATED])
  },

  taskUpdated: {
    subscribe: () => pubsub.asyncIterator([TASK_UPDATED])
  },

  taskDeleted: {
    subscribe: () => pubsub.asyncIterator([TASK_DELETED])
  },

  projectUpdated: {
    subscribe: () => pubsub.asyncIterator([PROJECT_UPDATED])
  }
};
