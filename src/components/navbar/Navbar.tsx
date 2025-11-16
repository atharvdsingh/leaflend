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

interface Props {}

function Navbar(props: Props) {
  const bookno: number = useAppSelector((state) => state.cart.NoOfBooks);
  const {} = props;

  return (
    <div className="flex z-10 items-center max-w-7xl m-auto justify-between">
      <div className="flex justify-center gap-4 items-center ">
        <Button asChild variant="ghost">
          <Link className="flex justify-center gap-2 items-center " href="/">
            <ArrowLeft />
            <p className="hidden md:block">Home</p>
          </Link>
        </Button>
        <div className="flex justify-center gap-2 items-center ">
          <Book /> LeafLend
        </div>
      </div>
      <div className="flex justify-center gap-4 items-center ">
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
                  className="absolute -top-1/2  -right-1/2 "
                >
                  {bookno ? bookno : null}
                </Badge>
              ) : null}
            </Link>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
