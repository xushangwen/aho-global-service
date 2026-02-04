import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

// IBM Plex Sans 支持中文
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
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
      <body className={`${ibmPlexSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
