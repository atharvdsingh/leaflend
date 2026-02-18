import MyBookNavigation from "@/components/navbar/MyBookNavigation";
import Procted from "@/components/Procted";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Procted>
     

      {children}
    </Procted>
  );
}
