import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql/sql';

export const verification = pgTable('verification', {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
