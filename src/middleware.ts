import { headers } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { auth, checkPathAuthorization } from "~/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const authResult = checkPathAuthorization(request, !!session);

  if (authResult.shouldRedirect && authResult.redirectTo) {
    return NextResponse.redirect(new URL(authResult.redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig & {
  runtime: string;
} = {
  runtime: "nodejs",
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
