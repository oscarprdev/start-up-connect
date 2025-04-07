import { relations } from 'drizzle-orm';
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

export const ideasTable = createTable('ideas', {
  id: uuid('id').notNull().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const ideasRelations = relations(ideasTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [ideasTable.id],
    references: [usersTable.id],
  }),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  ideas: many(ideasTable),
}));

export type Idea = typeof ideasTable.$inferSelect;
export type User = typeof usersTable.$inferSelect;
