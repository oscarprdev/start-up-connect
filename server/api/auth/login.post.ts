import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import type { H3Event, EventHandlerRequest } from 'h3';
import { usersTable } from '~~/server/db/schemas';
import { db } from '~~/server/db';
import { eq } from 'drizzle-orm';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default defineEventHandler(async event => {
  try {
    const { email, password } = await getExisitingUser(event);
    const { token } = await signInUser(email, password);

    return {
      message: 'Login successful',
      session: {
        token,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

const getExisitingUser = async (event: H3Event<EventHandlerRequest>) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user)
    throw createError({
      statusCode: 404,
      message: 'Error logging in, please check your credentials',
    });

  return {
    email,
    password,
  };
};

const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw createError({ statusCode: 500, message: error.message });
  if (!data.user) throw createError({ statusCode: 500, message: 'User not found' });

  return {
    token: data.session?.access_token,
  };
};
