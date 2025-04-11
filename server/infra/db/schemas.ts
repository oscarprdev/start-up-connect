import { relations, sql } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const usersTable = pgTable('users', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const ideasTable = pgTable('ideas', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    }),
});

export const dafosTable = pgTable('dafos', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  strengths: text('strengths').notNull(),
  weaknesses: text('weaknesses').notNull(),
  opportunities: text('opportunities').notNull(),
  threats: text('threats').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ideaId: varchar('idea_id', { length: 255 })
    .notNull()
    .references(() => ideasTable.id, {
      onDelete: 'cascade',
    }),
});

export const competitorsTable = pgTable('competitors', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  analysis: text('analysis').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ideaId: varchar('idea_id', { length: 255 })
    .notNull()
    .references(() => ideasTable.id, {
      onDelete: 'cascade',
    }),
});

export const uvpsTable = pgTable('uvps', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ideaId: varchar('idea_id', { length: 255 })
    .notNull()
    .references(() => ideasTable.id, {
      onDelete: 'cascade',
    }),
});

export const buyerPersonasTable = pgTable('buyer_personas', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ideaId: varchar('idea_id', { length: 255 })
    .notNull()
    .references(() => ideasTable.id, {
      onDelete: 'cascade',
    }),
});

export const roadmapItemsTable = pgTable('roadmap_items', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  priority: integer('priority').notNull(),
  order: integer('order').notNull(),
  dueDate: timestamp('due_date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  roadmapId: varchar('roadmap_id', { length: 255 })
    .notNull()
    .references(() => roadmapsTable.id, {
      onDelete: 'cascade',
    }),
});

export const roadmapsTable = pgTable('roadmaps', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ideaId: varchar('idea_id', { length: 255 })
    .notNull()
    .references(() => ideasTable.id, {
      onDelete: 'cascade',
    }),
});

export const roadmapItemsRelations = relations(roadmapItemsTable, ({ one }) => ({
  roadmap: one(roadmapsTable, {
    fields: [roadmapItemsTable.roadmapId],
    references: [roadmapsTable.id],
  }),
}));

export const buyerPersonasRelations = relations(buyerPersonasTable, ({ one }) => ({
  idea: one(ideasTable, {
    fields: [buyerPersonasTable.ideaId],
    references: [ideasTable.id],
  }),
}));

export const uvpsRelations = relations(uvpsTable, ({ one }) => ({
  idea: one(ideasTable, {
    fields: [uvpsTable.ideaId],
    references: [ideasTable.id],
  }),
}));

export const competitorsRelations = relations(competitorsTable, ({ one }) => ({
  idea: one(ideasTable, {
    fields: [competitorsTable.ideaId],
    references: [ideasTable.id],
  }),
}));

export const dafosRelations = relations(dafosTable, ({ one }) => ({
  idea: one(ideasTable, {
    fields: [dafosTable.ideaId],
    references: [ideasTable.id],
  }),
}));

export const ideasRelations = relations(ideasTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [ideasTable.userId],
    references: [usersTable.id],
  }),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  ideas: many(ideasTable),
}));

export type RoadmapItem = typeof roadmapItemsTable.$inferSelect;
export type Roadmap = typeof roadmapsTable.$inferSelect;
export type BuyerPersona = typeof buyerPersonasTable.$inferSelect;
export type Uvps = typeof uvpsTable.$inferSelect;
export type Competitor = typeof competitorsTable.$inferSelect;
export type Dafos = typeof dafosTable.$inferSelect;
export type Idea = typeof ideasTable.$inferSelect;
export type User = typeof usersTable.$inferSelect;

export const validateUser = (user: User) => userDTO.safeParse(user);
export const validateIdea = (idea: Idea) => ideaDTO.safeParse(idea);
export const validateDafos = (dafos: Dafos) => dafoDTO.safeParse(dafos);
export const validateCompetitor = (competitor: Competitor) => competitorDTO.safeParse(competitor);
export const validateUvps = (uvps: Uvps) => uvpsDTO.safeParse(uvps);
export const validateBuyerPersona = (buyerPersona: BuyerPersona) =>
  buyerPersonaDTO.safeParse(buyerPersona);

export const userDTO = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ideaDTO = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const dafoDTO = z.object({
  id: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  opportunities: z.string(),
  threats: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const competitorDTO = z.object({
  id: z.string(),
  analysis: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const uvpsDTO = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const buyerPersonaDTO = z.object({
  id: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roadmapItemDTO = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  priority: z.number(),
  order: z.number(),
  dueDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roadmapDTO = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserDTO = z.infer<typeof userDTO>;
export type IdeaDTO = z.infer<typeof ideaDTO>;
export type DafosDTO = z.infer<typeof dafoDTO>;
export type CompetitorDTO = z.infer<typeof competitorDTO>;
export type UvpsDTO = z.infer<typeof uvpsDTO>;
export type BuyerPersonaDTO = z.infer<typeof buyerPersonaDTO>;
export type RoadmapItemDTO = z.infer<typeof roadmapItemDTO>;
export type RoadmapDTO = z.infer<typeof roadmapDTO>;
