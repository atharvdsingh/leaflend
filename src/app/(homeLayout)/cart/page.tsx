"use client";
import CartCart from "@/components/Cart/CartCart";
import CenterComponent from "@/components/CenterComponent";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/store/store";
import { CarTaxiFront, Frown, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

interface Props {}

function Page(props: Props) {
  const {} = props;
  const cart = useSelector((state: RootState) => state.cart);

  if (cart.NoOfBooks === 0) {
    return (
      <CenterComponent>
        <div className="flex justify-center flex-col gap-3  items-center">
          <ShoppingCart className=" opacity-50 scale-200" />
          <p className="opacity-50">No Books Available</p>
          <Button asChild>
            <Link href={"/home"}>Browse Book</Link>
          </Button>
        </div>
      </CenterComponent>
    );
  }

  return (
    <>
      <div className="min-h-screen p-4 m-auto max-w-7xl">
        {
            cart.books.map((book)=> <div key={book.id} >
                <CartCart   {...book} />
            </div>
            
            )
        }

      </div>
    </>
  );
}

export default Page;
