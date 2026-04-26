"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { toast } from "sonner";
import type { ErrorType } from "@/types/ErrorType";
import { handleClientError } from "@/util/clientError";
import { AddToCart, EmptyCart } from "@/store/features/cartSlice";
import { createRentalRequest } from "@/services/rentbook.services";
import { useRouter, useSearchParams } from "next/navigation";


function Checkout() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter();
  const searchParams = useSearchParams();
  const NoOfBooks = useSelector((items: RootState) => items.cart);
  const booksId = NoOfBooks.books.map((books) => books.id)

  const handleOnclick = async () => {
    try {
      setLoading(true)

      const data = await createRentalRequest(booksId)
      if (data.status != 200) {
        toast.error("something went wrong")
        setLoading(false);
        return;
      }

      toast.success("books request have been sent")
      dispatch(EmptyCart())
      const roomId = searchParams.get("room");
      router.push(roomId ? `/rentedbooks?room=${roomId}` : `/rentedbooks`); // Assuming /rentedbooks is where they view their loans

    } catch (error: unknown) {
      setLoading(false);
      handleClientError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col p-4 border max-w-7xl w-full m-auto ">
        <Card className="flex border-0  w-full flex-col">
          <CardHeader>
            <CardTitle className="flex w-full  justify-between   items-center ">
              <p>items</p> <p>{NoOfBooks.NoOfBooks}</p>{" "}
            </CardTitle>
          </CardHeader>

          <CardFooter>
            <Button disabled={loading} className="w-full font-bold " onClick={handleOnclick}>
              Request books for rent
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Checkout;
