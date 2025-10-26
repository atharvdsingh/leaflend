"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";
import React, {
  useEffect,
  useState,
  type ReactElement,
  type ReactEventHandler,
} from "react";
import { ArrowRight, Book, LibraryBig, LogOut } from "lucide-react";

interface Props {}

function ManagingDiffrentButton(props: Props) {
  const [loading, setloading] = useState(false);
  const Session = useSession();
  const session=Session.data?.user?.id

  const handleONclick = (e: React.FormEvent) => {
    setloading(true);
    e.preventDefault();
    signIn("google" ,{callbackUrl:"/home"} );
  };

  return (
    <>
      {!session ? (
        <Button
          className={` flex justify-center items-center  ${
            loading ? "bg-gray-200" : ""
          }  `}
          disabled={loading}
          onClick={handleONclick}
        >
          Login With Google <FcGoogle />
        </Button>
      ) : (
        <div className="flex gap-5">
          <Button asChild className="flex  ">
            <div>
              <Link href={"/home"}>Get Started</Link>

              <ArrowRight />
            </div>
          </Button>
          <Button onClick={()=>signOut()} asChild className="cursor-pointer"  variant={"outline"}>
            <div>

            Log Out <LogOut />
            </div>
          </Button>
        </div>
      )}
    </>
  );
}

export default ManagingDiffrentButton;
