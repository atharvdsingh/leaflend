import { Button } from "@/components/ui/button";
import { GetTheSession } from "@/util/GetTheSession";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import ManagingDiffrentButton from "./ManagingDiffrentButton";
import React from "react";

interface Props {}

async function FirstPage(props: Props) {
  const session = await GetTheSession();

  return (
    <div className="flex flex-wrap min-h-screen w-full justify-evenly items-center p-4 sm:px-20 py-10">
      
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-5 items-start justify-center w-full md:w-1/2">
        <Button
          size="sm"
          className="text-xs rounded-full   hover:bg-primary-foreground hover:scale-105 cursor-crosshair hover:text-red-500 transition-all"
        >
          <Sparkle className="mr-2 h-4 w-4" />
          The Future of Book Sharing
        </Button>

        <div className="text-3xl sm:text-5xl md:text-6xl font-medium leading-tight">
          <h1>Rent Books</h1>
          <h1 className="text-green-600">Earn Money</h1>
          <h1>Read More</h1>
        </div>

        <p className="text-lg text-gray-400 wrap-break-word max-w-[600px]">
          Join the largest peer-to-peer book rental marketplace. Access thousands of
          books for a fraction of the cost, or turn your bookshelf into a steady
          income stream.
        </p>

        <ManagingDiffrentButton />
      </div>

      {/* RIGHT SECTION (IMAGE) */}
      <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[500px] flex justify-center items-center mt-8 md:mt-0">
        <Image
          src="/bg.jpg"
          alt="Cover"
          fill
          priority
          className="object-contain rounded-[85px] shadow-2xl"
        />
      </div>
    </div>
  );
}

export default FirstPage;
