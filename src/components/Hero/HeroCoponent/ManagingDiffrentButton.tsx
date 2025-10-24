"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


import Link from "next/link";
import React, {
  useState,
  type ReactElement,
  type ReactEventHandler,
} from "react";
import { ArrowRight, Book, LibraryBig } from "lucide-react";

interface Props {}

function ManagingDiffrentButton(props: Props) {
  const [loading, setloading] = useState(false);
  const session = useSession();
  const handleONclick = (e: React.FormEvent) => {
    setloading(true);
    e.preventDefault();
    signIn("google");
  };

  return (
    <>
      {!session ? (
        <Button
          className={` flex justify-center items-center  ${loading ? "bg-gray-200" : ""}  `}
          disabled={loading}
          onClick={handleONclick}
        >
          Login With Google  <FcGoogle/>
        </Button>
      ) : (
        <div>

        <Button className="flex  " >
            <Link href={""} >
            Get Started 
            </Link>
            
            <ArrowRight/>
            </Button>
            
        </div>
            
      )}
    </>
  );
}

export default ManagingDiffrentButton;
