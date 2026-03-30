import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const customer = await prisma.customers.findUnique({
          where: { Email: credentials.email as string },
        });

        if (!customer) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          customer.Password,
        );

        if (!isValid) return null;

        return {
          id: String(customer.CustomerId),
          name: customer.Name,
          email: customer.Email,
          role: customer.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
