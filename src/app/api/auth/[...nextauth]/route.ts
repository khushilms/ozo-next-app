import { authOptions } from '@/lib/auth';
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export const runtime = "nodejs";

export { handler as GET, handler as POST };