import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Library, Search, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-20 opacity-10 animate-pulse text-muted-foreground">
        <BookOpen size={120} />
      </div>
      <div className="absolute bottom-20 right-20 opacity-10 animate-pulse delay-700 text-muted-foreground">
        <Library size={120} />
      </div>

      <div className="z-10 text-center max-w-md mx-auto space-y-8">

        {/* Main Icon/Illustration */}
        <div className="relative inline-block">
          <div className="bg-card p-6 rounded-full shadow-xl shadow-primary/10 mb-4 animate-bounce duration-[3000ms] border border-border">
            <Search className="text-green-500 w-16 h-16" strokeWidth={2.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            404
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Oops! It looks like this book is missing from our shelves. Alternatively, the page you are looking for might have been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20 transition-all hover:scale-105">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted/50 text-foreground">
            <Link href="/room" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Browse Rooms
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer Helper */}
      <div className="absolute bottom-8 text-muted-foreground text-sm">
        <p>BookChetna Library System</p>
      </div>
    </div>
  );
}