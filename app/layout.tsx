import type { Metadata } from "next";
import { Ovo } from "@next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { config } from "@/lib/config";

const legan = localFont({
  src: "./fonts/Legan.woff",
  variable: "--font-legan",
  weight: "100 900",
});

const thesignature = localFont({
  src: "./fonts/Thesignature.ttf",
  variable: "--font-thesignature",
  weight: "100 900",
});

const wonder = localFont({
  src: "./fonts/Wonder.woff",
  variable: "--font-wonder",
  weight: "100 900",
});

const ovo = Ovo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ovo",
});

export const metadata: Metadata = {
  title: `The Wedding of ${config.coupleNames}`,
  description: `Wedding Invitation of ${config.coupleNames}, made by YUMA Studio`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Mela & Oji Wedding Invitation" />
        <meta property="og:description" content="Undangan pernikahan Mela & Oji. Save the date & sampaikan doa terbaikmu di sini!" />
        <meta property="og:image" content="/og.jpeg" />
        <meta property="og:url" content="https://mela-oji.vercel.app" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mela & Oji Wedding Invitation" />
        <meta name="twitter:description" content="Undangan pernikahan Mela & Oji. Save the date & sampaikan doa terbaikmu di sini!" />
        <meta name="twitter:image" content="/og.jpeg" />
      </head>
      <body
        className={`bg-[#0a0a0a]  ${ovo.variable} ${thesignature.variable} ${wonder.variable} ${legan.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
