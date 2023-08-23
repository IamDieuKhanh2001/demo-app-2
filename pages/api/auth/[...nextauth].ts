import { APIUserLogin } from "@/lib/axios/api/accountAPI";
import { Password } from "@mui/icons-material";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "email", type: "text", placeholder: "MyEmail@gmail.com" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // disable self-signed certificate
                    const res = await APIUserLogin(credentials?.email, credentials?.password)
                    const user = res.data;

                    console.log(res);

                    if (res.status === 200 && user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (e) {
                    console.log("Catch blog");
                    console.log(e)
                    return null;
                }
            }

        }),
    ],
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any; // same type as session user

            return session;
        },
    },
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/authentication/login",
    },
};
export default NextAuth(authOptions);