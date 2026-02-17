"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Book,
  BookUser,
  CarTaxiFront,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { Carter_One } from "next/font/google";
import CreateBook from "../CreateBook";
import { useAppSelector } from "@/lib/hooks";
import { Badge } from "../ui/badge";


function Navbar() {
  const bookno: number = useAppSelector((state) => state.cart.NoOfBooks);

  return (
    <div className="flex z-10 items-center max-w-7xl mx-auto justify-between px-4 md:px-0 py-2">
      <div className="flex justify-center gap-4 items-center ">
        <Button asChild variant="ghost" className="hidden md:flex">
          <Link className="flex justify-center gap-2 items-center " href="/">
            <ArrowLeft />
            <p>Home</p>
          </Link>
        </Button>
        <div className="flex justify-center gap-2 items-center font-bold text-xl">
          <Book /> LeafLend
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex justify-center gap-4 items-center ">
        <CreateBook />

        <Button asChild variant="outline">
          <div>
            <Link
              className="flex justify-center gap-2 relative items-center "
              href={"/cart"}
            >
              <ShoppingCart /> Cart
              {bookno ? (
                <Badge
                  variant={"destructive"}
                  className="absolute -top-2 -right-2 px-1.5 py-0.5"
                >
                  {bookno ? bookno : null}
                </Badge>
              ) : null}
            </Link>
          </div>
        </Button>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden gap-2 items-center">
        <Link href="/cart" className="relative p-2">
          <ShoppingCart className="w-6 h-6" />
          {bookno ? (
            <Badge
              variant={"destructive"}
              className="absolute -top-1 -right-1 px-1 py-0.5 text-[10px]"
            >
              {bookno}
            </Badge>
          ) : null}
        </Link>

        {/* We can add a mobile menu here later if needed, but for now specific requirements were limited. 
            For 'Post a Book' on mobile, we can show a compact version or just the icon. 
        */}
        <div className="block md:hidden">
          <CreateBook />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
