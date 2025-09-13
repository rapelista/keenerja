import { headers } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { authorization } from "~/configs/authorization";
import { auth } from "~/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const hasSession = !!session;

  const accessingMustPublic = authorization.mustPublic.some((path) =>
    request.nextUrl.pathname.match(new RegExp(`^${path}$`))
  );

  const accessingMustPrivate = authorization.mustPrivate.some((path) =>
    request.nextUrl.pathname.match(new RegExp(`^${path}$`))
  );

  if (hasSession && accessingMustPublic) {
    return NextResponse.redirect(
      new URL(authorization.paths.dashboard, request.url)
    );
  }

  if (!hasSession && accessingMustPrivate) {
    return NextResponse.redirect(
      new URL(authorization.paths.signIn, request.url)
    );
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
