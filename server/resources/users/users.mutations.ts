import { z } from 'zod';
import { db } from '~~/server/db';
import { usersTable, type User } from '~~/server/db/schemas';

const users = usersTable;

interface UserMutations {
  storeUser: (input: StoreUserInput) => Promise<void>;
}

export type StoreUserInput = z.infer<typeof storeUserSchema>;
const storeUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
});

const storeUser = async (input: z.infer<typeof storeUserSchema>): Promise<void> => {
  const validated = storeUserSchema.safeParse(input);
  if (!validated.success) throw new Error(validated.error.message);

  const { id, email, username } = validated.data;

  await db.insert(users).values({ id, email, username });
};

export const usersMutations: UserMutations = {
  storeUser,
};
