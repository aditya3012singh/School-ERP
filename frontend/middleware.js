import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const role = decoded.role;
  const pathname = req.nextUrl.pathname;

  // 🔐 ROLE-BASED DASHBOARD ACCESS
  if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  if (pathname.startsWith("/dashboard/teacher") && role !== "TEACHER") {
    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  if (pathname.startsWith("/dashboard/student") && role !== "STUDENT") {
    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  if (pathname.startsWith("/dashboard/parent") && role !== "PARENT") {
    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
