import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// CLIENT_ID=924277714387-fen3qpsrkbgrc00r5pnsvig6l92mdlb5    .apps.googleusercontent.com
// CLIENT_SECRET=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

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);