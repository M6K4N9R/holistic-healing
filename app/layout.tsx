import './globals.css';
import { Grechen_Fuemen } from 'next/font/google';
import Providers from '@/components/Providers'; 

const grechen = Grechen_Fuemen({ 
  weight: "400", 
  subsets: ["latin"],
  variable: '--font-grechen'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={grechen.variable}>
      <body className="bg-gradient-to-br from-indigo-50 to-emerald-50 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
