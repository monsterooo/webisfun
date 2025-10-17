import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plantin = localFont({
  src: [
    {
      path: "../public/fonts/plantin/PlantinMTProRg.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-plantin",
});

export const metadata: Metadata = {
  title: "WebIsFun",
  description: "Webisfun is a blog about programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plantin.variable} antialiased font-geist`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
