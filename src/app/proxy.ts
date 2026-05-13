import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "access_token";
const LOGIN_PATH = "/login";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const isAuthenticated = Boolean(accessToken);

  const isProtectedRoute =
    pathname.startsWith("/dashboard/student") ||
    pathname.startsWith("/dashboard/tutor");

  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (
    isAuthenticated &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
