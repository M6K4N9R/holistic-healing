"use client";

import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import BottomNavBar from "@/components/BottomNavBar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SessionProvider>
        {children}
        <BottomNavBar />
      </SessionProvider>
    </SWRConfig>
  );
}
