import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniFind - Discover Anime from Screenshots",
  description:
    "Upload any anime screenshot and instantly discover the anime name, episode, and exact scene. Powered by perceptual hashing and FAISS search technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://umami.juliomacedo.dev/script.js"
          data-website-id="065d2b3d-98ac-46ac-b510-ac52b8fba09d"
          strategy="afterInteractive"
        />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
