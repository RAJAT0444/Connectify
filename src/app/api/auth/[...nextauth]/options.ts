

// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import dbConnect from '@/lib/dbConnect';
// import UserModel from '@/model/User';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         identifier: { label: 'Email or Username', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials: any) {
//         await dbConnect();

//         const user = await UserModel.findOne({
//           $or: [
//             { email: credentials.identifier },
//             { username: credentials.identifier },
//           ],
//         });

//         if (!user) {
//           throw new Error('No user found with this email or username');
//         }

//         if (!user.isVerified) {
//           throw new Error('Please verify your account before logging in');
//         }

//         const isPasswordCorrect = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordCorrect) {
//           throw new Error('Incorrect password');
//         }

//         return {
//           id: (user._id as { toString: () => string }).toString(),
//           _id: (user._id as { toString: () => string }).toString(),
//           username: user.username,
//           email: user.email,
//           isVerified: user.isVerified,
//           isAcceptingMessages: user.isAcceptingMessages ?? true,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id || user.id;
//         token.username = user.username;
//         token.isVerified = user.isVerified;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         // Type assertion to avoid TS error if session.user is readonly
//         (session.user as any)._id = token._id;
//         (session.user as any).username = token.username;
//         (session.user as any).isVerified = token.isVerified;
//       }
//       return session;
//     },
//   },

//   session: {
//     strategy: 'jwt',
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   pages: {
//     signIn: '/sign-in',
//   },
// };













import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

interface Credentials {
  identifier: string;
  password: string;
}

interface ExtendedToken {
  _id?: string;
  username?: string;
  isVerified?: boolean;
  [key: string]: unknown;
}

interface ExtendedSessionUser {
  _id?: string;
  username?: string;
  isVerified?: boolean;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) throw new Error('Missing credentials');
        await dbConnect();

        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        }) as any;

        if (!user) {
          throw new Error('No user found with this email or username');
        }

        if (!user.isVerified) {
          throw new Error('Please verify your account before logging in');
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error('Incorrect password');
        }

        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages ?? true,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedSessionUser;
        token._id = extendedUser._id || user.id;
        token.username = extendedUser.username;
        token.isVerified = extendedUser.isVerified ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      const extendedSessionUser = session.user as ExtendedSessionUser;
      const extendedToken = token as ExtendedToken;

      if (extendedToken) {
        extendedSessionUser._id = extendedToken._id;
        extendedSessionUser.username = extendedToken.username;
        extendedSessionUser.isVerified = extendedToken.isVerified;
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/sign-in',
  },
};





