import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "@/lib/metadata";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7efe3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", manrope.variable)}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="m-0 flex w-full min-w-0 flex-col p-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
