// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    // যদি কেউ /admin পেজে ঢুকতে চায় কিন্তু সে admin না হয়
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // শুধুমাত্র লগইন করা ইউজাররাই ঢুকতে পারবে
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };