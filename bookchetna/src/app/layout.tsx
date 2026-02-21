import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./StoreProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins", // we’ll use this for selective CSS
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leaflend | Peer-to-Peer Book Sharing",
  description: "Join the largest community-driven book rental marketplace. Rent books, earn money, and read more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <StoreProvider>
          <Provider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </Provider>
        </StoreProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
