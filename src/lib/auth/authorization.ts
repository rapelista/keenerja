import { NextRequest } from 'next/server';
import { authorization } from '~/configs/authorization';

export interface AuthorizationResult {
  hasSession: boolean;
  shouldRedirect: boolean;
  redirectTo?: string;
}

/**
 * Check if a path requires authentication and handle redirects
 */
export function checkPathAuthorization(
  request: NextRequest,
  hasSession: boolean,
): AuthorizationResult {
  const pathname = request.nextUrl.pathname;

  const accessingMustPublic = authorization.mustPublic.some((path) =>
    pathname.match(new RegExp(`^${path}$`)),
  );

  const accessingMustPrivate = authorization.mustPrivate.some((path) =>
    pathname.match(new RegExp(`^${path}$`)),
  );

  // User is authenticated but accessing public-only route
  if (hasSession && accessingMustPublic) {
    return {
      hasSession,
      shouldRedirect: true,
      redirectTo: authorization.paths.dashboard,
    };
  }

  // User is not authenticated but accessing private route
  if (!hasSession && accessingMustPrivate) {
    return {
      hasSession,
      shouldRedirect: true,
      redirectTo: authorization.paths.signIn,
    };
  }

  return {
    hasSession,
    shouldRedirect: false,
  };
}

/**
 * Utility function to check if a path is protected
 */
export function isProtectedPath(pathname: string): boolean {
  return authorization.mustPrivate.some((path) =>
    pathname.match(new RegExp(`^${path}$`)),
  );
}

/**
 * Utility function to check if a path is public-only
 */
export function isPublicOnlyPath(pathname: string): boolean {
  return authorization.mustPublic.some((path) =>
    pathname.match(new RegExp(`^${path}$`)),
  );
}
