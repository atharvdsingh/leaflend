"use client";
import React from "react";

// --- Icon Imports ---
// Assumes `lucide-react` is installed (`npm install lucide-react`)
import {
  Axis3D,
  BookOpen,
  Delete,
  DeleteIcon,
  ShoppingCart,
  Trash,
} from "lucide-react";

// --- Shadcn UI Component Imports ---
// These components are assumed to be in your project, added via:
// `npx shadcn-ui@latest add card`
// `npx shadcn-ui@latest add button`
// `npx shadcn-ui@latest add badge`
// The path `@/components/ui` is the default for Next.js.
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { bookAvailavleStatus } from "@/types/databaseRoutesType";
import type { booksHave, BookStatus } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "@/store/features/cartSlice";
import type { RootState } from "@/store/store";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { addNewMyBook, removeMyBook, visibilityStatusChanged } from "@/store/features/mybookSlice";
import type { SerializableBook } from "@/types/bookstypeforRedux";
import { handleClientError } from "@/util/clientError";
import Image from "next/image";

/**
 * HomeCard
 * A component displaying a book/item for rent, built with shadcn/ui.
 * It's designed to match a dark, modern aesthetic.
 */

interface Props {
  title: string; // Changed from String
  author: string; // Changed from String
  genre: string; // Changed from String
  price: string;
  imageURL: string; // User changed from imageUrl
  available: BookStatus;
}

export default function MyBooksCard() {
  const cart = useSelector((state: RootState) => state.mybooks.myallBooks);
  const dispatch = useDispatch();

  const handleDeleteTheVideo = async (book: SerializableBook) => {
    try {
      const res = await api.post("/mybooks/deletebook", { id: book.id });

      if (res.status == 200) {
        toast.success("book removed succesfully");
        dispatch(removeMyBook(book.id))

      }
      // ... inside component ...

      // ... inside component ...

    } catch (error) {
      handleClientError(error);
    }
  };


  const handleVisibilityStatus = async (book: SerializableBook) => {
    try {
      const res = await api.put("/mybooks", { book })
      if (!res || res.data.status != 200) {
        return toast.error("something went wrong")
      }
      toast.success(res.data.message)
      dispatch(visibilityStatusChanged(book))


    } catch (error) {
      handleClientError(error)

    }

  }


  const showVisiblelity = (currentStatus: SerializableBook["visibilityStatus"]): SerializableBook["visibilityStatus"] => {

    if (currentStatus == "HIDE") {
      return "SHOW"
    }
    return "HIDE"
  }

  // Kept max-w-64 (256px)
  return (
    <>
      <div className="grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" >

        {
          cart.map((book) => (
            <div className=" gap-4 p-4" key={book.id} >
              <Card className="max-w-64 w-full rounded-2xl bg-card border-border text-card-foreground overflow-hidden shadow-2xl">
                {/* Image container */}
                <div className="relative">
                  <Image
                    src={book.cover || "/1.jpg"}
                    alt={`Cover image of ${book.bookname}`}
                    // Changed to h-40 (160px)
                    className="w-full h-40  object-cover"
                    width={40}
                    height={40}
                  />

                  {/* Available Badge, positioned absolutely */}
                  {book.status && (
                    <Badge
                      variant="default" // Kept user's variant
                      // Reduced padding
                      className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-2 py-0.5 text-[10px] font-bold border-0 h-5"
                    >
                      Available
                    </Badge>
                  )}
                </div>

                {/* Header: Contains Title and Author - Reduced padding */}
                <CardHeader className="p-2">
                  {/* Reduced text size and added truncate */}
                  <CardTitle className="text-base font-semibold text-card-foreground truncate">
                    {book.bookname}
                  </CardTitle>
                  {/* Reduced text size */}
                  <CardDescription className="text-muted-foreground text-xs pt-0.5">
                    {/* {""} //authro name */}
                  </CardDescription>
                </CardHeader>

                {/* Content: Contains Genre and Price - Reduced padding */}
                <CardContent className="p-2 pt-0">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">{book.bookType}</span>
                    {/* Reduced text size */}
                    <span className="text-green-400 font-bold text-sm">{""}</span>
                  </div>
                </CardContent>

                {/* Footer: Contains the action buttons - Reduced padding and gap */}
                <CardFooter className="p-2 pt-0 grid grid-cols-2 gap-1.5">
                  {/* Made buttons smaller */}
                  <Button
                    onClick={() => handleVisibilityStatus(book)}

                    variant="outline"
                    className="text-foreground border-border hover:bg-muted hover:text-foreground h-8 px-3 text-xs"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    {showVisiblelity(book.visibilityStatus)}
                  </Button>

                  <Button
                    disabled={book.status == "BORROWED"}
                    onClick={() => handleDeleteTheVideo(book)}
                    className="bg-primary text-primary-foreground hover:bg-primary/80 font-semibold h-8 px-3 text-xs"
                  >
                    <Trash />
                  </Button>
                </CardFooter>
              </Card></div>
          ))
        }
      </div>
    </>

  );
}

