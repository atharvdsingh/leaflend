"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Book, BookUser, CarTaxiFront, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Carter_One } from "next/font/google";

interface Props {}

function Navbar(props: Props) {
  const {} = props;

  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-center gap-4 items-center ">
        <Button asChild variant="ghost">
          <div>
            <Link
              className="flex justify-center gap-2 items-center "
              href={"/"}
            >
              <ArrowLeft /> Home
            </Link>
          </div>
        </Button>
        <div className="flex justify-center gap-2 items-center ">
          <Book /> LeafLend
        </div>
      </div>
      <div className="flex justify-center gap-4 items-center ">
        <Button asChild variant="default">
          <div>
            <Link className="flex justify-center gap-2 items-center " href={""}>
              <Plus /> Add Book
            </Link>
          </div>
        </Button>

        <Button asChild variant="outline">
          <div>
            <Link className="flex justify-center gap-2 items-center " href={""}>
              <ShoppingCart /> Cart
            </Link>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
