import { Button } from "@/components/ui/button";
import { GetTheSession } from "@/util/GetTheSession";
import { Sparkle, Star } from "lucide-react";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import React from "react";
import ManagingDiffrentButton from "./ManagingDiffrentButton";
import Image from "next/image";

interface Props {}



async function FirstPage() {
    const session=await GetTheSession()
    
  

  return (
    <>
      <div className="flex flex-wrap min-h-full w-full justify-evenly">
        {/* this is first section  */}
        <div className="w-1/2 flex justify-center flex-col gap-5 items-start  sm:p-30 ">
          <Button
            size="sm"
            className=" text-xs   rounded-4xl hover:bg-primary-foreground hover:scale-105 cursor-crosshair  hover:text-red-500 "
          >
            <Sparkle /> The Future of Book sharing
          </Button>

          <div className="flex  text-7xl  flex-col">
            <h1>Rent Books</h1>
            <h1 className="text-green-600">Earn Money</h1>
            <h1>Read More</h1>
          </div >
 <p className="wrap-break-word   text-[20px] text-gray-400  " >Join the largest peer-to-peer book rental marketplace. Access thousands of books for a fraction of the cost, or turn your bookshelf into a steady income stream.</p>  
            <ManagingDiffrentButton/>
 
        </div>
        {/* this is second section  */}
        <div className="w-1/2 flex justify-center items-center ">
        <div 
        className="w-full h-[80vh] rounded-3xl  relative " >

        <Image  
        src={"/bg.jpg"}
        alt="image"
           fill
    style={{ objectFit: "contain", objectPosition: "center" }}

        />
        </div>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
