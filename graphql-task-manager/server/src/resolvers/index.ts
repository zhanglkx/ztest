import { queries } from './queries';
import { mutations } from './mutations';
import { subscriptions } from './subscriptions';
import { fieldResolvers } from './fieldResolvers';

export const resolvers = {
  Query: queries,
  Mutation: mutations,
  Subscription: subscriptions,
  ...fieldResolvers
};
