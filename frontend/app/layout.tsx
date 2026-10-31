import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Browser Use Cloud Dashboard",
  description: "Self-hosted Browser Use dashboard",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon-192.svg",
    apple: "/icon-192.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#f5f7fb] text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
