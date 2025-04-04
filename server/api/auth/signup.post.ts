import { z } from 'zod';
import { usersQueries } from '~~/server/resources/users/users.queries';
import { usersMutations } from '~~/server/resources/users/users.mutations';
import { supabase } from '~~/server/db';
import type { H3Event, EventHandlerRequest } from 'h3';

const bodySchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().min(8),
});

export default defineEventHandler(async event => {
  try {
    const { username, email, password } = await verifyUser(event);
    const user = await signUpUser(email, password);
    await usersMutations.storeUser({
      id: user.id,
      email,
      username,
    });

    return {
      message: 'User created successfully',
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

const verifyUser = async (event: H3Event<EventHandlerRequest>) => {
  const { email, password, username } = await readValidatedBody(event, bodySchema.parse);
  const user = await usersQueries.getUserByEmailOrUsername({ email, username });
  if (user) {
    throw createError({
      statusCode: 400,
      message: 'User already exists with same email or username.',
    });
  }

  return {
    email,
    password,
    username,
  };
};

const signUpUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw createError({ statusCode: 500, message: error.message });
  if (!data.user) {
    throw createError({ statusCode: 500, message: 'Error signing up user, please try again.' });
  }

  return data.user;
};
