import { z } from 'zod';
import { usersUseCases } from '~/server/resources/users/users.use-cases';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async event => {
  try {
    const { email, password } = await readValidatedBody(event, bodySchema.parse);
    const [user] = await usersUseCases.getUserByEmail(email);
    if (!user) throw createError({ statusCode: 404, message: 'User not found' });

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) throw createError({ statusCode: 401, message: 'Bad credentials' });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw createError({ statusCode: 500, message: error.message });
    if (!data.user) throw createError({ statusCode: 500, message: 'User not found' });

    await setUserSession(event, {
      user: {
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
      },
    });
    return {
      message: 'Login successful',
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});
