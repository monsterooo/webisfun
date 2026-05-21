import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SandPackCSS } from "@/components/sandpack/sandpack-styles";
import { WebSiteJsonLd } from "@/components/json-ld";

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
  metadataBase: new URL("https://webisfun.dev"),
  title: {
    default: "WebIsFun",
    template: "%s | WebIsFun",
  },
  description:
    "关于 CSS、动画和现代前端开发的博客，由 BuildWithZhu 撰写。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "WebIsFun",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@BuildWithZhu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <SandPackCSS />
        <WebSiteJsonLd />
      </head>
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
