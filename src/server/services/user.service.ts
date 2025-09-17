import { TRPCError } from '@trpc/server';
import { eq, like, and, desc, asc } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { user } from '~/db/schema';
import type {
  UpdateProfileInput,
  CreateUserInput,
  UserFilterInput,
  PaginationInput,
  SearchInput,
} from '../validators';

/**
 * User service - handles all user-related business logic
 */
export class UserService {
  /**
   * Get paginated list of users with optional filtering
   */
  static async getUsers(
    filters: Partial<UserFilterInput & PaginationInput & SearchInput> = {},
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      emailVerified,
      sortOrder = 'desc',
    } = filters;

    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(like(user.name, `%${search}%`));
    }

    if (typeof emailVerified === 'boolean') {
      conditions.push(eq(user.emailVerified, emailVerified));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Build order by
    const orderByClause =
      sortOrder === 'asc' ? asc(user.createdAt) : desc(user.createdAt);

    const users = await db
      .select()
      .from(user)
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(limit)
      .offset(offset);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total: users.length, // You might want to run a separate count query
      },
    };
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string) {
    const result = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!result.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return result[0];
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, input: UpdateProfileInput) {
    const updatedUser = await db
      .update(user)
      .set({
        ...input,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(user.id, userId))
      .returning();

    if (!updatedUser.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return updatedUser[0];
  }

  /**
   * Create new user (admin only)
   */
  static async createUser(input: CreateUserInput) {
    // Check if email already exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, input.email))
      .limit(1);

    if (existingUser.length) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email already exists',
      });
    }

    const newUser = await db
      .insert(user)
      .values({
        id: crypto.randomUUID(), // You might want to use a proper ID generator
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return newUser[0];
  }

  /**
   * Delete user
   */
  static async deleteUser(userId: string) {
    const deletedUser = await db
      .delete(user)
      .where(eq(user.id, userId))
      .returning();

    if (!deletedUser.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return { success: true };
  }
}
