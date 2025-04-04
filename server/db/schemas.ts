import { pgTableCreator, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator(name => `${name}`);

export const usersTable = createTable('users', {
  id: uuid('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type User = typeof usersTable.$inferSelect;
