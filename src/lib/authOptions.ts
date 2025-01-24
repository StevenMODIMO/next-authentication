import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/User";
import { dbConnect } from "@/lib/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        await dbConnect();
        if (!email || !password) {
          throw new Error("All fields must be filled");
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Incorrect email");
        }
        const match = await compare(password, user.password);
        if (!match) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        return {
          ...token,
          id: user.id
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};
