import FAQ from "@/components/Hero/HeroCoponent/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | BookChetna",
    description: "Find answers to common questions about renting, lending, and earning money with BookChetna's peer-to-peer book sharing platform.",
    keywords: ["BookChetna FAQ", "book rental questions", "how to rent books", "how to lend books", "peer-to-peer book sharing help"],
    alternates: {
        canonical: "https://book.sanchenta.in/faq",
    },
    openGraph: {
        title: "Frequently Asked Questions | BookChetna",
        description: "Everything you need to know about renting and lending books on BookChetna.",
        url: "https://book.sanchenta.in/faq",
        siteName: "BookChetna",
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Frequently Asked Questions | BookChetna",
        description: "Everything you need to know about renting and lending books on BookChetna.",
    },
};

export default function FAQPage() {
    return (
        <main className="flex animate-fade-in-blur flex-col min-h-screen bg-background pt-24">
            <FAQ />
        </main>
    );
}
