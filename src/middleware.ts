import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { method } = req;

    // Allow GET requests without authentication
    if (method === "GET") {
      return NextResponse.next();
    }

    // If it's not GET, check if the user is authenticated
    const token = req.nextauth.token;
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Proceed normally
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/api/categories/:path*",
    "/api/products/:path*",
  ],
};
