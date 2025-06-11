

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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
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