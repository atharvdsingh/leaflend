import { Button } from "@/components/ui/button";
import { Sparkle, BookOpen, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import AuthButtons from "./AuthButtons";
import AuthButtonSkeleton from "./AuthButtonSkeleton";

async function FirstPage() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/10 dark:bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-wrap w-full max-w-7xl mx-auto px-6 sm:px-12 py-12 md:py-20 gap-12 lg:gap-0 items-center">

        {/* LEFT SECTION (Types) */}
        <div className="flex flex-col gap-8 items-start justify-center w-full lg:w-1/2 z-10">

          <Button
            size="sm"
            variant="outline"
            className="text-xs font-medium rounded-full px-4 h-8 bg-background/50 backdrop-blur-md border-green-500/30 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 transition-all group"
          >
            <Sparkle className="mr-2 h-3.5 w-3.5 fill-green-500 text-green-500 group-hover:rotate-12 transition-transform" />
            The Future of Book Sharing
          </Button>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Rent Books, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                Earn Money.
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-[580px] leading-relaxed">
            Join the largest peer-to-peer book rental marketplace. Access thousands of books for a fraction of the cost, or turn your bookshelf into a steady income stream.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Suspense fallback={<AuthButtonSkeleton />}>
              <AuthButtons />
            </Suspense>

          </div>



        </div>

        {/* RIGHT SECTION (Image) */}
        <div className="relative w-full lg:w-1/2 min-h-[400px] md:min-h-[600px] flex justify-center items-center">

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl rotate-12 opacity-10 blur-xl animate-pulse" />

          <div className="relative w-[300px] sm:w-[400px] h-[450px] sm:h-[550px] transition-transform hover:scale-[1.02] duration-700 ease-out">
            <Image
              src="/bg.jpg"
              alt="Reading a book"
              fill
              priority
              className="object-cover rounded-[40px] shadow-2xl shadow-green-900/10 border border-border/50"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce [animation-duration:3s]">
              <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-full text-green-600">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active Rentals</p>
                <p className="text-lg font-bold">120+ Today</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FirstPage;
