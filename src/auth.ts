// import bcrypt from "bcryptjs";
// import { eq } from "drizzle-orm";
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { v4 as uuidv4 } from "uuid";

// import { db } from "@/server/db/index";
// import { roles, sessions, users } from "@/server/db/schema";

// export const options: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         Email: { label: "Email", type: "email" },
//         Password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.Email || !credentials?.Password) {
//           return null;
//         }

//         const Users = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, credentials.Email))
//           .leftJoin(roles, eq(users.role_id, roles.id))
//           .limit(1);

//         if (!Users || Users?.length === 0) {
//           return null;
//         }

//         const user = Users[0];

//         if (!user.users.email_verified) {
//           throw new Error("Email not verified");
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.Password ?? "",
//           user.users.password ?? ""
//         );

//         if (!isPasswordValid) {
//           return null;
//         }

//         return {
//           id: user.users.id,
//           email: user.users.email,
//           name: user.users.name,
//           image: user.users.profile_image,
//           role: user?.roles?.name || "member",
//           roleId: user?.users.role_id,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "github" || account?.provider === "google") {
//         try {
//           const existingUser = await db
//             .select()
//             .from(users)
//             .where(eq(users.email, user.email as string))
//             .leftJoin(roles, eq(users.role_id, roles.id))
//             .limit(1);

//           const userRole = await db
//             .select({ Id: roles.id, Name: roles.name })
//             .from(roles)
//             .where(eq(roles.name, "member"))
//             .limit(1);

//           const roleId = userRole[0].Id;
//           const roleName = userRole[0].Name;

//           if (existingUser?.length === 0) {
//             const newUserId = uuidv4();
//             await db.insert(users).values({
//               id: newUserId,
//               name: user.name as string,
//               email: user.email as string,
//               profile_image: user.image as string,
//               password: " ",
//               role_id: roleId,
//               email_verified: true,
//               status: "active",
//             });
//             user.id = newUserId;
//             user.role = roleName;
//           } else {
//             user.id = existingUser[0].users.id;
//             user.role = existingUser[0]?.roles?.name || "";
//           }
//           if (existingUser[0]?.users?.status === "in_active") {
//             await db
//               .update(users)
//               .set({
//                 name: user.name as string,
//                 profile_image: user.image as string,
//                 role_id: roleId,
//                 email_verified: true,
//                 gender: null,
//                 phone: null,
//                 address: null,
//                 status: "active",
//                 marital_status: null,
//                 date_of_birth: null,
//               })
//               .where(eq(users.id, existingUser[0].users.id));
//             user.id = existingUser[0].users.id;
//             user.role = roleName;
//           }
//         } catch (err) {
//           const error = err as Error;
//           return error.message;
//         }
//       }

//       const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//       const sessionToken = uuidv4();
//       try {
//         await db.insert(sessions).values({
//           session_token: sessionToken,
//           user_id: user.id,
//           expires,
//         });

//         user.session_token = sessionToken;
//       } catch (err) {
//         const error = err as Error;
//         return error.message;
//       }

//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.session_token = user.session_token;
//         token.email = user.email;
//         token.name = user.name;
//         token.image = user.image;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.accessToken = token.session_token as string;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//     async redirect({ baseUrl }) {
//       return Promise.resolve(baseUrl);
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET as string,
//   },
// };
