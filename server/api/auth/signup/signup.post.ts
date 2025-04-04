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
    if (user) throw createError({ statusCode: 400, message: 'User already exists' });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw createError({ statusCode: 500, message: error.message });
    if (!data.user) throw createError({ statusCode: 500, message: 'User not found' });

    await usersUseCases.createUser(data.user.id, email, password);

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
