import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from 'jsonwebtoken';

const getAuthOptions = (): AuthOptions => {
  return {
    adapter: SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    }),
    callbacks: {
      async session({ session, user }) {
        const signingSecret = process.env.SUPABASE_JWT_SECRET;
        if (signingSecret) {
          const payload = {
            aud: 'authenticated',
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: user.id,
            email: user.email,
            role: 'authenticated',
          };
          session.supabaseAccessToken = jwt.sign(payload, signingSecret);
        }
        return session;
      },
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST || '',
          port: process.env.EMAIL_SERVER_PORT || '',
          auth: {
            user: process.env.EMAIL_SERVER_USER || '',
            pass: process.env.EMAIL_SERVER_PASSWORD || '',
          },
        },
        from: process.env.EMAIL_FROM || '',
      }),
    ],
    pages: {
      signIn: '/sign-in',
      error: '/sign-in',
    },
  };
};
export default NextAuth(getAuthOptions());

export const authOptions = getAuthOptions();
