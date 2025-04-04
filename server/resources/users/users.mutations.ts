import { db } from '~/server/db';
import { usersTable } from '~/server/db/schemas';
import { z } from 'zod';
const users = usersTable;

const createUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const usersMutations = {
  createUser: async (id: string, email: string, password: string) => {
    const validated = createUserSchema.safeParse({ id, email, password });
    if (!validated.success) throw new Error(validated.error.message);

    const user = await db.insert(users).values({ id, email, password, username: email });
    return user;
  },
};
