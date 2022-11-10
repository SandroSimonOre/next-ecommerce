import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import dbConnect from '../../../utils/db';

export default NextAuth({
  
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [

    CredentialsProvider({

      async authorize(credentials) {
        const db = await  dbConnect()
        //console.log(credentials)
        console.log('......')
        const user = await User.findOne({
          email: credentials.email,
        });
        //console.log(user)
        
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };

        }
        throw new Error('Invalid email or password.');
      },
    }),
  ],
});