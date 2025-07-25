import NextAuth, { DefaultSession } from "next-auth";
//next auth gives you sessions
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
    } & DefaultSession["user"];
  }
}
