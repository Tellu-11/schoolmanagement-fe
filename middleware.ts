import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/register") ||
    req.nextUrl.pathname.startsWith("/login");

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/landing", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
