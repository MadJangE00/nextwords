import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // ✅ 로그인 시 JWT에 사용자 정보와 자체 토큰 포함
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.social_id = profile.sub;
        token.provider = account.provider;

        // 여기에 직접 발급하는 JWT 추가
        token.token = jwt.sign(
          {
            user_id: profile.sub,
            provider: account.provider,
          },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: '7d' }
        );
      }
      return token;
    },

    // ✅ 세션 객체에 사용자 정보 및 자체 JWT 토큰 포함
    async session({ session, token }) {
      session.user!.social_id = (token as any).social_id;
      session.user!.provider = (token as any).provider;
      session.user!.token = (token as any).token; // Unity에 넘길 토큰
      return session;
    },
  },
});

export { handler as GET, handler as POST };
