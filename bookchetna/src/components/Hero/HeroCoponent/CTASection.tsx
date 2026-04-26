import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-green-600 to-green-800 px-6 py-20 sm:px-12 sm:py-24 text-center shadow-2xl shadow-green-900/20">

          {/* Decorative Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-black rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Ready to Turn Your Bookshelf into Income?
            </h2>

            <p className="text-green-50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join thousands of readers who are already sharing books and earning money. It takes less than 2 minutes to list your first book.
            </p>


          </div>

        </div>
      </div>
    </section>
  );
}
