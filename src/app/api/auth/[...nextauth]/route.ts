import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.social_id = profile.sub; // google UID
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user!.social_id = (token as any).social_id;
      session.user!.provider = (token as any).provider;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
