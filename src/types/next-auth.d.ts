import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      social_id?: string;
      provider?: string;
      token?: string;
    };
  }

  interface JWT {
    social_id?: string;
    provider?: string;
  }
}
