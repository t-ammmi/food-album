import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.scss";
import Header from "../components/Header/Header";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
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
    <html
      lang="ja"
      className={`${notoSerifJP.variable} h-full antialiased`}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
