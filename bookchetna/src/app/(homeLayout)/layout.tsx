import Navbar from "@/components/navbar/Navbar";
import Procted from "@/components/Procted";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Procted>
      <div className="min-h-screen">
        {/* Unified Navbar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Navbar />
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </Procted>
  );
}
