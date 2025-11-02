import React from "react";
import { Card, CardHeader } from "../ui/card";
import type { booksHave } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Cross, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { RemoveFromCart } from "@/store/features/cartSlice";
import type { AllBooksType } from "@/app/types/databaseRoutesType";
import type { SerializableBook } from "@/app/types/bookstypeforRedux";

function CartCart(props: SerializableBook) {
  const dispatcher = useDispatch();
  const {} = props;
  const handleRemoveFromCart = () => {
    dispatcher(RemoveFromCart(props));
  };

  return (
    <>
      <Card className="flex flex-col gap-6 p-4 rounded-[6px] " >
        <div className="flex items-center space-x-2 gap-4">
          <Image
            src={"/1.jpg"}
            className="shrink-0 w-20 h-20 overflow-hidden "
            alt={props.bookname}
            width={20}
            height={28}
          />

          <div className="flex-1 min-w-0">
            <p className="line-clamp-1">{props.bookname}</p>
            <p className="text-sm text-gray-600">
              {/* this is for author */}
              {props.bookType}
            </p>
          </div>
          <div>
            <button className="hover:text-red-700 transition-all cursor-pointer " onClick={handleRemoveFromCart}>
              <X />
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default CartCart;
