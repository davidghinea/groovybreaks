import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      accessToken?: string | null;
    } & DefaultSession["user"];
  }
  interface JWT {
    accessToken?: string | null;
  }
}
// Here I modify the types of the session so i can add the Spotify OAuth Access Token to the session object.

export const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization:
        "https://accounts.spotify.com/authorize?response_type=code&scope=user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,playlist-read-private,playlist-read-collaborative,playlist-modify-private,playlist-modify-public,user-read-email,user-read-private",
    }),
    // The scopes in the link give the app the permissions to view and modify the user's Spotify data.
    // I selected most of the scopes, so they would allow me to do anything I want in the development process.
    // See docs here: https://developer.spotify.com/documentation/web-api/concepts/scopes
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Store the access token in the JWT token if available
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  // NextAuth uses predefined callbacks for providers, which help us execute code before the session is stored:
  // the code above stores the access token into the session, which is not stored by default

  // !!! Please keep in mind this access token should always be accessed in a safe environment such as server components,
  // because it grants permission to anyone who has it, to do actions on behalf of the user AS YOUR APPLICATION !!!
};
