import Hero from "@/components/Hero/Hero";
import FirstPage from "@/components/Hero/HeroCoponent/FirstPage";
import SecondSection from "@/components/Hero/HeroCoponent/SecondSection";
import { dir } from "console";
import Image from "next/image";



export default async function Home() {
  return (
 <div   >
            <FirstPage/>
            <SecondSection/>    
        </div>
  );
}
