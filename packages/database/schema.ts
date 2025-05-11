import { relations, sql } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const visibility = pgEnum('visibility', ['PUBLIC', 'PRIVATE']);
export const role = pgEnum('role', ['OWNER', 'ADMIN', 'USER', 'GUEST']);

export const users = pgTable('users', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  avatarUrl: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  role: role().default('USER'),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(usersToProjects),
}));

export const status = pgEnum('status', ['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export const projects = pgTable('projects', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 120 }).notNull(),
  description: t.text().notNull(),
  slug: t.text().notNull(),
  status: status().default('DRAFT'),
  thumbnail: t.json().$type<{ id: string; url: string }>(),
  isDeleted: t.boolean().default(false),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  invitations: many(invitations),
  users: many(usersToProjects),
}));

export const CreateProjectSchema = createInsertSchema(projects, {
  name: z.string().max(32),
  description: z.string().max(210),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const usersToProjects = pgTable('projects', (t) => ({
  userId: t
    .uuid()
    .notNull()
    .references(() => users.id),
  projectId: t
    .uuid()
    .notNull()
    .references(() => projects.id),
}));

export const invitations = pgTable('invitations', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  email: t.text().notNull().unique(),
  projectId: t
    .uuid()
    .references(() => projects.id)
    .notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
}));
