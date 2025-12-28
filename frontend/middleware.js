import { NextResponse } from "next/server";

export function middleware(req) {
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard) {
    // real protection will come later via cookies
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
