import Navbar from "@/components/navbar/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="sticky border-y top-0 ">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Navbar />
        </div>
      </div>
      {children}
    </div>
  );
}
