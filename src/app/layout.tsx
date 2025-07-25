import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
const OpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Book",
  description: "A book reading app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={OpenSans.variable}>
      <body className={`${OpenSans.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
