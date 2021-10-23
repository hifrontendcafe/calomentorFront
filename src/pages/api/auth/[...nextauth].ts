import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {
  CalomentorAdminID,
  CalomentorMentorID,
  FrontendCafeID,
} from "@/config/DiscordID";
import { LOGIN, UNAUTHORIZED } from "@/config/Routes";
import axios from "axios";
import { createUser, getUserByID } from "@/lib/userAPI";

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: "identify email guilds",
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  // Callbacks | https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn(user, account, profile) {
      const guildResp = await fetch(
        "https://discord.com/api/users/@me/guilds",
        {
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
          },
        }
      );
      const guilds = await guildResp.json();
      // Check if the user is a member of the discord server.
      if (guilds.find((guild: { id: string }) => guild.id === FrontendCafeID)) {
        const { data: userInfo } = await axios.get(
          `https://discord.com/api/guilds/${FrontendCafeID}/members/${user.id}`,
          {
            headers: {
              Authorization: `Bot ${process.env.CALOMENTOR_BOT_TOKEN}`,
            },
          }
        );
        const isAdmin = userInfo.roles.includes(CalomentorAdminID);
        const isMentor = userInfo.roles.includes(CalomentorMentorID);
        // Check if the user has the necesary roles to log in.
        if (!isAdmin && !isMentor) {
          return UNAUTHORIZED;
        }
        // Asign role number depending of the roles the user have.
        user.role = getRole(isAdmin, isMentor);
        // Check if user exists else create it
        const userAWS = await getUserByID(user.id as string);
        if (userAWS === 404) {
          const role =
            isAdmin && isMentor
              ? ["admin", "mentor"]
              : isAdmin
              ? ["admin"]
              : ["mentor"];
          try {
            await createUser({
              id: user.id as string,
              role,
            });
          } catch (error) {
            return false;
          }
        }
        return true;
      } else {
        return UNAUTHORIZED;
      }
    },
    jwt: async (token, user) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: async (session, user) => {
      session.user.id = user.sub as number;
      session.user.role = user.role as string;
      return session;
    },
  },
  pages: {
    signIn: LOGIN,
  },
});

const getRole = (isAdmin: boolean, isMentor: boolean) => {
  if (isAdmin && !isMentor) {
    return "0";
  }
  if (!isAdmin && isMentor) {
    return "1";
  }
  if (isAdmin && isMentor) {
    return "2";
  }
};
