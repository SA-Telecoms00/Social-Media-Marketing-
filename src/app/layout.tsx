import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sa-telecoms.co.za"),
  title: "SA Telecoms — Your Brand. Everywhere.",
  description: "We grow brands through social media strategy, content, and paid advertising. SA Telecoms is your partner for explosive social media growth.",
  keywords: ["social media marketing", "social media management", "social media advertising", "SA Telecoms", "brand growth", "South Africa"],
  authors: [{ name: "SA Telecoms" }],
  openGraph: {
    title: "SA Telecoms — Your Brand. Everywhere.",
    description: "We grow brands through social media strategy, content, and paid advertising. SA Telecoms is your partner for explosive social media growth.",
    url: "https://sa-telecoms.co.za",
    siteName: "SA Telecoms",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/SaTelecoms-Logo.png",
        width: 512,
        height: 512,
        alt: "SA Telecoms Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SA Telecoms — Your Brand. Everywhere.",
    description: "We grow brands through social media strategy, content, and paid advertising.",
    images: ["/SaTelecoms-Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
