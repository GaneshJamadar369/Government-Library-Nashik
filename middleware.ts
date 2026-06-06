import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-dev-secret-change-in-prod")

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow login page and login API through
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next()
  }

  const token = req.cookies.get("admin_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  try {
    await jwtVerify(token, SECRET)
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL("/admin/login", req.url))
    res.cookies.delete("admin_token")
    return res
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
