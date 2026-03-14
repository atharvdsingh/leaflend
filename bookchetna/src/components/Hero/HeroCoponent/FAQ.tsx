"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function FAQ() {
  const faqs = [
    {
      question: "Is it safe to rent my books to strangers?",
      answer: "Yes! We verify all users through a secure identity check. Additionally, our platform holds a security deposit for every rental, ensuring your books are protected against loss or damage.",
    },
    {
      question: "How do I get paid for my rentals?",
      answer: "Earnings are deposited directly into your linked bank account or digital wallet once the rental period is successfully completed and the book is returned.",
    },
    {
      question: "What happens if a book is returned late?",
      answer: "Borrowers are charged a late fee for every extra day they keep the book. This fee is passed on to you as compensation.",
    },
    {
      question: "Can I set my own rental prices?",
      answer: "Absolutely. You have full control over the daily or weekly rental price. We provide suggested pricing based on the book's value and demand, but the final decision is yours.",
    },
    {
      question: "Is there a limit to how many books I can list?",
      answer: "No, there is no limit! Whether you have one book or a thousand, you can list as many as you like and turn your library into a source of income.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Common Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Everything you need to know about renting and lending on BookChetna.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg pr-4">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
