import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

// Oswald 类似 D-DIN 风格，用于数字
const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
});

export const metadata: Metadata = {
  title: "全球服务网络 - 澳弘电子",
  description: "澳弘电子全球服务网络展示，覆盖全球22+国家和地区",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${oswald.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
