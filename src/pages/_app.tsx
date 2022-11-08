import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '@/context/UserContext';
import { ToastProvider } from '@/context/ToastContext';
import { AppProps } from 'next/app';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from '@/provider';

const CalomentorApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ApiProvider api={api}>
      <SessionProvider session={session}>
        <UserProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </UserProvider>
      </SessionProvider>
    </ApiProvider>
  );
};

export default CalomentorApp;
