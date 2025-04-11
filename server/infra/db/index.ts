import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || '';
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
export const supabase = createClient(supabaseUrl, supabaseKey);
