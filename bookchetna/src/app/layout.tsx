import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./StoreProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/Theme-provider";
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
  title: "BookChetna | Peer-to-Peer Book Sharing",
  description: "Join the largest community-driven book rental marketplace. Rent books, earn money, and read more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <Provider>
            <TooltipProvider>
              <ThemeProvider attribute="class"
                defaultTheme="system"
                enableSystem

                disableTransitionOnChange

              >

                {children}
              </ThemeProvider>
            </TooltipProvider>
          </Provider>
        </StoreProvider>
        <Toaster  position="top-center" 
        toastOptions={{
          className: "bg-background text-foreground",
        }}
        />
      </body>
    </html>
  );
}
