
import type { NextAuthConfig } from 'next-auth';

const authConfig = {
  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;

      const protectedPaths =
        pathname.startsWith('/admin') ||
        pathname === '/meetings/new' ||
        /^\/meetings\/[^/]+\/edit\/?$/.test(pathname);

      if (protectedPaths) {
        return !!auth?.user;
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
