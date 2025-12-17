import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import LayoutNavBar from "../components/LayoutNavBar";
import type { TreatmentsData } from "../types/api";
import "@/styles/global.css";
import { Grechen_Fuemen } from "next/font/google";

const grechen = Grechen_Fuemen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-grechen",
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={grechen.variable}>
      <body>
        <SWRConfig value={{ fetcher }}>
          <SessionProvider>
            <LayoutNavBar>{children}</LayoutNavBar>
          </SessionProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
