import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }


// app/api/auth/[...nextauth]/route.js
// import NextAuth from "next-auth"

// // Create auth options directly here to avoid import issues
// const authOptions = {
//   providers: [
//     {
//       id: "google",
//       name: "Google",
//       type: "oauth",
//       wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       },
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }
