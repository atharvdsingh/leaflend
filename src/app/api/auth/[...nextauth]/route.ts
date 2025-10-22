import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const GET= NextAuth({
  providers:[
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret:process.env.CLIENT_SECRET!
    })
  ]
  

})

export const POST=GET

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.CLIENT_ID!,
//       clientSecret: process.env.CLIENT_SECRET!,
//     }),
//     // ...add more providers here
//   ],
// }

// export default NextAuth(authOptions)