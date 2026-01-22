import "@/styles/globals.css";
import { Grechen_Fuemen } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import UserTopBar from "@/components/UserTopBar";
import BottomNavBar from "@/components/BottomNavBar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Providers>
          <UserTopBar />
          <Toaster richColors position="top-right" />
          {children}
          <BottomNavBar />
        </Providers>
      </body>
    </html>
  );
}
