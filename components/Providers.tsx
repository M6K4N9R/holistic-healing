'use client';

import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import LayoutNavBar from '@/components/LayoutNavBar';
import BottomNavBar from '@/components/BottomNavBar';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SessionProvider>
        <LayoutNavBar>
          {children}
          <BottomNavBar />
        </LayoutNavBar>
      </SessionProvider>
    </SWRConfig>
  );
}
