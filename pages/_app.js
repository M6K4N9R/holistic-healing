import "@/styles/globals.css";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </SWRConfig>
  );
}
