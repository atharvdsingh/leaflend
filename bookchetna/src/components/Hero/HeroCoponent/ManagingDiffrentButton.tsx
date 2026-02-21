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
import type { Session } from "next-auth";

interface Props {
  session: Session
}

function ManagingDiffrentButton(props: Props) {
  const [loading, setloading] = useState(false);
  const { session } = props

  const handleONclick = (e: React.FormEvent) => {
    setloading(true);
    e.preventDefault();
    signIn("google", { callbackUrl: "/room" });
  };

  return (
    <>
      {!session ? (
        <Button
          className={` flex justify-center items-center  ${loading ? "bg-muted" : ""
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
              {/* <Link href={"/home/page=1"}>Get Started</Link> */}
              <Link href={"/room"}>Get Started</Link>

              <ArrowRight />
            </div>
          </Button>
          <Button onClick={() => signOut()} asChild className="cursor-pointer" variant={"outline"}>
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
