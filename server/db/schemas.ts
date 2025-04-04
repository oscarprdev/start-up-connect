import { pgTableCreator, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator(name => `${name}`);

export const usersTable = createTable('users', {
  id: uuid('id').notNull().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  username: text('username').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type DbUser = typeof usersTable.$inferSelect;
export type NewDbUser = typeof usersTable.$inferInsert;
