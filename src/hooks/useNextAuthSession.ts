import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export const useNextAuthSession = (): [
  session: Session | null,
  isloading: boolean,
] => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  return [session, isLoading];
};
