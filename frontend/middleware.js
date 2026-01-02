import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // 🔒 If logged in → block "/" and "/dashboard"
  if (token && (pathname === "/" || pathname === "/dashboard")) {
    try {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      return NextResponse.redirect(
        new URL(`/dashboard/${role.toLowerCase()}`, req.url)
      );
    } catch {
      // invalid token → clear path
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // ❌ Not logged in → protect dashboard routes
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const role = decoded.role;

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
  matcher: ["/", "/dashboard/:path*"],
};
