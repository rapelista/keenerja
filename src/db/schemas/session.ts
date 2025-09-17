import {
  foreignKey,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql/sql';
import { user } from './user';

export const session = pgTable(
  'session',
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp({ mode: 'string' }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'session_userId_fkey',
    }).onDelete('cascade'),
    unique('session_token_key').on(table.token),
  ],
);
