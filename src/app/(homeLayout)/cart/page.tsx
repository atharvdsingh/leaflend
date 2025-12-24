"use client";
import CartCart from "@/components/Cart/CardCart";
import Checkout from "@/components/Cart/Checkout";
import CenterComponent from "@/components/CenterComponent";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/store/store";
import {  ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";


function Page() {
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
      <div className="min-h-screen flex flex-col gap-4 p-4 m-auto max-w-7xl">
        {
            cart.books.map((book)=> <div key={book.id} >
                <CartCart   {...book} />
            </div>
            
            )
        }
        <Checkout/>

      </div>
    </>
  );
}

export default Page;
