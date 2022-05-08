import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '@/context/UserContext';
import { ToastProvider } from '@/context/ToastContext';
import { AppProps } from 'next/app';

const CalomentorApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default CalomentorApp;
