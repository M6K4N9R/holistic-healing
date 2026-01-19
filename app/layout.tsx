import "@/styles/globals.css";
import { Grechen_Fuemen } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

const grechen = Grechen_Fuemen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-grechen",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={grechen.variable}>
      <body className="antialiased font-sans">
        <Providers>
          <Toaster richColors position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
