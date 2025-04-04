import { pgTableCreator, text, uuid } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator(name => `${name}`);

export const usersTable = createTable('users', {
  id: uuid('id').notNull().primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
});

export type DbUser = typeof usersTable.$inferSelect;
export type NewDbUser = typeof usersTable.$inferInsert;
