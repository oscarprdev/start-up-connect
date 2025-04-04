import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL || '';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schemas.ts',
  out: './server/db/migrations',
  dbCredentials: {
    url: connectionString,
  },
});
