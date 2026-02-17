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
        <div className="absolute top-4 left-4 z-50">
          <SmartBackButton />
        </div>

        {children}
      </div>
    </Procted>
  );
}
