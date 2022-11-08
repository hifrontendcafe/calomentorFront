import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import {
  CalomentorAdminID,
  CalomentorMentorID,
  FECMentorID,
  FrontendCafeID,
} from '@/config/DiscordID';
import { LOGIN, UNAUTHORIZED } from '@/config/Routes';
import axios from 'axios';
import { createUser, getUserByID } from '@/services/userAPI';
import { RoleType } from '@/interfaces/user.interface';

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      authorization: { params: { scope: 'email identify guilds' } },
    }),
  ],
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  // Callbacks | https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account }) {
      if (!account?.access_token) {
        return false;
      }
      const guildResp = await fetch(
        'https://discord.com/api/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        },
      );
      const guilds = await guildResp.json();

      if (guildResp.status === 401) {
        return UNAUTHORIZED;
      }

      // Check if the user is a member of the discord server.
      if (guilds.find((guild: { id: string }) => guild.id === FrontendCafeID)) {
        const { data: userInfo } = await axios.get(
          `https://discord.com/api/guilds/${FrontendCafeID}/members/${user.id}`,
          {
            headers: {
              Authorization: `Bot ${process.env.CALOMENTOR_BOT_TOKEN}`,
            },
          },
        );
        const isAdmin = userInfo.roles.includes(CalomentorAdminID);
        const isMentor =
          userInfo.roles.includes(CalomentorMentorID) ||
          userInfo.roles.includes(FECMentorID);
        // Check if the user has the necesary roles to log in.
        if (!isAdmin && !isMentor) {
          return UNAUTHORIZED;
        }
        // Asign role number depending of the roles the user have.
        // @ts-ignore
        user.role = getRole(isAdmin, isMentor);
        // Check if user exists else create it
        try {
          await getUserByID(user.id as string);
        } catch (error: any) {
          if (error.message === '404') {
            const role: RoleType[] =
              isAdmin && isMentor
                ? ['admin', 'mentor']
                : isAdmin
                ? ['admin']
                : ['mentor'];
            try {
              await createUser({
                id: user.id as string,
                role: role,
              });
            } catch (error) {
              return false;
            }
          }
        }
        return true;
      } else {
        return UNAUTHORIZED;
      }
    },
    jwt: async ({ user, token }) => {
      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = Number.parseInt(token.sub as string);
      session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: LOGIN,
  },
});

const getRole = (isAdmin: boolean, isMentor: boolean) => {
  if (isAdmin && !isMentor) {
    return '0';
  }
  if (!isAdmin && isMentor) {
    return '1';
  }
  if (isAdmin && isMentor) {
    return '2';
  }
};
