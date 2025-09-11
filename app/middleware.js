import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Gracefully disable Clerk unless explicitly enabled
const hasClerk = process.env.NEXT_PUBLIC_ENABLE_CLERK === "true";

export default hasClerk
  ? clerkMiddleware({
      publicRoutes: ["/", "/sign-in", "/sign-up"],
    })
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/sign-in(.*)",    // ✅ add this
    "/sign-up(.*)",    // ✅ add this
    "/dashboard(.*)",
  ],
};
