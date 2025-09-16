// Centralized exports for authentication
export {
  checkPathAuthorization,
  isProtectedPath,
  isPublicOnlyPath,
  type AuthorizationResult,
} from './authorization';

export { auth } from './config';

export { signIn, signOut, signUp } from './client';
