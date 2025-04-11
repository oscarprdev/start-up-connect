import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL || '';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/infra/db/schemas.ts',
  out: './server/infra/db/migrations',
  dbCredentials: {
    url: connectionString,
  },
});
