import type { NextAuthConfig } from "next-auth";
import { GetUserByEMAIL } from "./backend/fetch";
import { UserSignIn } from "@/backend/schema/user";

import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs"

export default {providers: [
    Credentials({
        async authorize(credentials){
            const validated = UserSignIn.safeParse(credentials);
            if(validated.success){
                const { email, password } = validated.data;
                const user = await GetUserByEMAIL(email);
                if(!user || !user.password || !user.email) return null;
                const matched = await bcryptjs.compare(
                    password, user.password
                );
                if(matched) return user;
            }
            return null;
        },
    }),
]} satisfies NextAuthConfig;