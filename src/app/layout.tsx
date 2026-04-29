import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { getSiteContent } from "@/lib/content";
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

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();
  
  return {
    metadataBase: new URL('https://bshaffer.co'),
    title: siteContent.heroHeadline,
    description: siteContent.heroBio,
    openGraph: {
      title: siteContent.heroHeadline,
      description: siteContent.heroBio,
      url: "https://bshaffer.co",
      siteName: "Brad Shaffer",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Brad Shaffer · Product Leader building B2B tools for operational and financial data",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteContent.heroHeadline,
      description: siteContent.heroBio,
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
    },
  };
}

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
