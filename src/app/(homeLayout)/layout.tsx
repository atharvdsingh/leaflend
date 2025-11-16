import Navbar from "@/components/navbar/Navbar";
import NavbarSec from "@/components/navbar/NavbarSec";
import Procted from "@/components/Procted";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 



{
  return (
    <Procted>
      <div className="  min-h-screen">

    

        <div className="sticky z-10 backdrop-blur-2xl border-y top-0 ">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Navbar />
          </div>
        </div>


        <div className="flex sticky z-6 backdrop-blur-xl items-center mx-4 py-4 top-14  justify-center my-20  ">
          <NavbarSec />
        </div>


        {children}
      </div>
    </Procted>
  );
}
