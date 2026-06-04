import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@/lib/types";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: UserRole }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as UserRole) ?? "USER";
      }
      return session;
    },
    authorized({ auth, request }) {
      const isAdmin = request.nextUrl.pathname.startsWith("/admin");
      if (!isAdmin) return true;
      if (!auth?.user) return false;
      if (auth.user.role !== "ADMIN") {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },
  providers: [],
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
