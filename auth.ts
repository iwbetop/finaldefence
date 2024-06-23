import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { GetUserByID } from "./backend/fetch";
import { JWT } from "next-auth/jwt"
import authConfig from "./auth.config";
import { prisma } from "./backend/prisma";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER" | "SUPERADMIN"
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER" | "SUPERADMIN"
    }
}

export const {
    auth, signIn, signOut, handlers
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    callbacks: {
        async session({token, session, user}){
            if(!token.sub || !token) return session;
            session.user.role = token.role as "ADMIN" | "SUPERADMIN" | "USER";
            if(session.user && token.sub){
                session.user.id = token.sub;
            }
            if(token.role && session.user.role){
                session.user.role = token.role
            }
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const exist = await GetUserByID(token.sub);
            if(!exist) return token;
            token.role = exist.role;
            return token;
        },
    }
});