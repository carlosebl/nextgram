import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const config = {
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    providers : [google],
    callbacks: {
        session({ session, token }) {
            if (token.sub) session.user.userId = token.sub;
            return session;
        }
    },
    pages: {
        signIn: "/signin",
    }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

interface ProviderWithId {
    id: string;
    name: string;
}

export const providerMap = config.providers.map((provider) => {
    const typeProvider = provider as unknown as ProviderWithId;
    return {
        id: typeProvider.id,
        name: typeProvider.name,
    }
})