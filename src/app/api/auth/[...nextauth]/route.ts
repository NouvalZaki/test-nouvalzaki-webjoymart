import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const [rows] = await pool.query(
          'SELECT userId, user_name, passwordUser, role FROM users_editor WHERE user_name = ?', 
          [credentials.username]
        );
        
        const user = (rows as any[])[0];

        if (user && await bcrypt.compare(credentials.password, user.passwordUser)) {
          return { 
            id: user.userId.toString(), 
            name: user.user_name, 
            role: user.role 
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    }
  },
  pages: { signIn: '/admin/login' },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };