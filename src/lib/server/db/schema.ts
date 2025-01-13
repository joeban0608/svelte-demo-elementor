import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const _templates = pgTable('template', {
	id: serial('id').primaryKey(),
	html: text('html').notNull(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});


export type Template = typeof _templates.$inferSelect;
