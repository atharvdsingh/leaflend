import Procted from "@/components/Procted";
import { SmartBackButton } from "@/components/room/SmartBackButton";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Procted>
      <div className="relative min-h-screen">
        <div className="absolute top-4 inset-x-0 z-50 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 pointer-events-auto flex justify-start">
            <SmartBackButton />
          </div>
        </div>

        {children}
      </div>
    </Procted>
  );
}
