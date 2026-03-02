import FirstPage from "@/components/Hero/HeroCoponent/FirstPage";
import SecondSection from "@/components/Hero/HeroCoponent/SecondSection";
import HowItWorks from "@/components/Hero/HeroCoponent/HowItWorks";
import FAQ from "@/components/Hero/HeroCoponent/FAQ";
import CTASection from "@/components/Hero/HeroCoponent/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookChetna | Rent Books, Earn Money, Share Knowledge",
  description: "Join BookChetna, the premier peer-to-peer book rental marketplace. Rent books locally, list your own collection to earn money, and connect with a community of readers.",
  keywords: ["rent books", "online book rental", "earn money from books", "p2p book sharing", "used books", "book library", "BookChetna"],
  alternates: {
    canonical: "https://book.sanchetna.in",
  },
  openGraph: {
    title: "BookChetna | Rent Books & Earn Money",
    description: "The smart way to read. Rent books from neighbors or lend yours to earn extra income.",
    url: "https://book.sanchetna.in",
    siteName: "BookChetna",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookChetna | Rent Books & Earn Money",
    description: "The smart way to read. Rent books from neighbors or lend yours to earn extra income.",
  },
};

// JSON-LD structured data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "BookChetna",
      url: "https://book.sanchetna.in",
      description:
        "The premier peer-to-peer book rental marketplace. Rent books locally, list your collection to earn money.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://book.sanchetna.in/home?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "BookChetna",
      url: "https://book.sanchetna.in",
      logo: "https://book.sanchetna.in/favicon.ico",
      sameAs: [],
    },
  ],
};

export default async function Home() {
  return (
    <main className="flex animate-fade-in-blur flex-col min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section id="hero" className="w-full">
        <FirstPage />
      </section>

      <section id="features" className="w-full">
        <SecondSection />
      </section>

      <section id="how-it-works" className="w-full">
        <HowItWorks />
      </section>

      <section id="faq" className="w-full">
        <FAQ />
      </section>

      <section id="cta" className="w-full mb-12">
        <CTASection />
      </section>

    </main>
  );
}
