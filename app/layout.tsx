import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Navbar,Footer} from "/components/index.ts"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoRentalHub",
  description: "driving excursion,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang='en'>
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
