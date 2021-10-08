import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { UserProvider } from "@/context/UserContext";
import { ToastProvider } from "@/context/ToastContext";

const CalomentorApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <UserProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </UserProvider>
    </Provider>
  );
};

export default CalomentorApp;
