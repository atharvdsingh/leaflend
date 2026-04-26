import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./StoreProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/Theme-provider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googlesans = Google_Sans_Flex({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-googlesens"
})

export const metadata: Metadata = {
  metadataBase: new URL("https://book.sanchetna.in"),
  title: {
    default: "BookChetna | Peer-to-Peer Book Sharing",
    template: "%s | BookChetna",
  },
  description:
    "Join the largest community-driven book rental marketplace. Rent books, earn money, and read more.",
  keywords: [
    "book rental",
    "rent books online",
    "peer to peer book sharing",
    "earn money from books",
    "used books",
    "BookChetna",
    "book marketplace",
  ],
  authors: [{ name: "BookChetna" }],
  creator: "BookChetna",
  alternates: {
    canonical: "https://book.sanchetna.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://book.sanchetna.in",
    siteName: "BookChetna",
    title: "BookChetna | Peer-to-Peer Book Sharing",
    description:
      "Rent books from neighbors, lend yours to earn money. The smartest way to read.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookChetna | Peer-to-Peer Book Sharing",
    description:
      "Rent books from neighbors, lend yours to earn money. The smartest way to read.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <div className="animate-fade-in-blur">
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
        </div>
        <Analytics />
        <Toaster position="top-right"
          toastOptions={{
            className: "bg-background text-foreground",
          }}
        />
      </body>
    </html>
  );
}
