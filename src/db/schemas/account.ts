import { foreignKey, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql/sql';
import { user } from './user';

export const account = pgTable(
  'account',
  {
    id: text().primaryKey().notNull(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text().notNull(),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ mode: 'string' }),
    refreshTokenExpiresAt: timestamp({ mode: 'string' }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'account_userId_fkey',
    }).onDelete('cascade'),
  ],
);
