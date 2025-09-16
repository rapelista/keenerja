import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: '.env', quiet: process.env.NODE_ENV === 'production' });

export const db = drizzle(process.env.DATABASE_URL!);
