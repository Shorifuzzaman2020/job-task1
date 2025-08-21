// lib/auth.js
// import GoogleProvider from "next-auth/providers/google"

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       }
//     }),
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
//     async redirect({ url, baseUrl }) {
//       // Allows relative callback URLs
//       if (url.startsWith("/")) return `${baseUrl}${url}`
//       // Allows callback URLs on the same origin
//       else if (new URL(url).origin === baseUrl) return url
//       return baseUrl
//     },
//   },
// }

// export default authOptions