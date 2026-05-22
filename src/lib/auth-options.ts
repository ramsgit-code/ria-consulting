import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = process.env.ADMIN_EMAIL;
        const hash = process.env.ADMIN_PASSWORD_HASH;
        const plain = process.env.ADMIN_PASSWORD;

        if (!email || !credentials?.email || !credentials?.password) return null;
        if (credentials.email.toLowerCase() !== email.toLowerCase()) return null;

        let valid = false;
        if (hash) {
          valid = await bcrypt.compare(credentials.password, hash);
        } else if (plain) {
          valid = credentials.password === plain;
        }

        if (!valid) return null;
        return { id: "admin", email, name: "Admin" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (token.email) session.user = { ...session.user, email: token.email as string };
      return session;
    },
  },
};
