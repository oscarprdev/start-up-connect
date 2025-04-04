import { eq, or } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '~~/server/db';
import { type User, usersTable } from '~~/server/db/schemas';

const users = usersTable;

interface UsersQueries {
  getUserByEmailOrUsername: (input: GetUserByEmailOrUsernameInput) => Promise<User | null>;
}

export type GetUserByEmailOrUsernameInput = z.infer<typeof getUserByEmailOrUsernameSchema>;
const getUserByEmailOrUsernameSchema = z.object({
  email: z.string().email(),
  username: z.string(),
});

const getUserByEmailOrUsername = async (
  input: GetUserByEmailOrUsernameInput
): Promise<User | null> => {
  const validated = getUserByEmailOrUsernameSchema.safeParse(input);
  if (!validated.success) throw new Error(validated.error.message);

  const [user] = await db
    .select()
    .from(users)
    .where(or(eq(users.email, validated.data.email), eq(users.username, validated.data.username)));

  return user || null;
};

export const usersQueries: UsersQueries = {
  getUserByEmailOrUsername,
};
