import { db } from '~/server/db';
import { usersTable } from '~/server/db/schemas';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
const users = usersTable;

const getUserByEmailSchema = z.object({
  email: z.string().email(),
});

export const usersQueries = {
  getUserByEmail: async (email: string) => {
    const validated = getUserByEmailSchema.safeParse({ email });
    if (!validated.success) throw new Error(validated.error.message);

    const user = await db.select().from(users).where(eq(users.email, validated.data.email));
    return user;
  },
};
