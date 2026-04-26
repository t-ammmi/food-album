import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.scss";
import Header from "../components/Header/Header";
import { ClerkProvider } from "@clerk/nextjs";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "ごはんアルバム",
  description: "食べたごはんを記録するためのアルバムアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="ja"
        className={`${notoSerifJP.variable} h-full antialiased`}
      >
        <body suppressHydrationWarning>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
