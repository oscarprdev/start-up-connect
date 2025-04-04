import { usersQueries } from './users.queries';
import { usersMutations } from './users.mutations';
export const usersUseCases = {
  getUserByEmail: async (email: string) => {
    const user = await usersQueries.getUserByEmail(email);
    return user;
  },
  createUser: async (id: string, email: string, password: string) => {
    const user = await usersMutations.createUser(id, email, password);
    return user;
  },
};
