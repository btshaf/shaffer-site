import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bshaffer.co'),
  title: "Brad Shaffer · Product Leader",
  description: "Product leader building scalable, simple experiences on top of complex, chaotic data. Specializing in fintech operations, reconciliation systems, and financial infrastructure.",
  openGraph: {
    title: "Brad Shaffer · Product Leader",
    description: "Product leader building scalable, simple experiences on top of complex, chaotic data. Specializing in fintech operations, reconciliation systems, and financial infrastructure.",
    url: "https://bshaffer.co",
    siteName: "Brad Shaffer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brad Shaffer — Senior Product Manager · Fintech & Financial Operations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brad Shaffer · Product Leader",
    description: "Product leader building scalable, simple experiences on top of complex, chaotic data. Specializing in fintech operations, reconciliation systems, and financial infrastructure.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
