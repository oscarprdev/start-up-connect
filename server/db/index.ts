import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || '';

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
