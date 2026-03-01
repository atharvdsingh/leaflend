import React, { Suspense } from "react";
import { GetTheSession } from "@/util/GetTheSession";
import { getAvailableBooks } from "@/services/book.service";
import HomeCard from "@/components/Home/HomeCard";
import NoBooks from "@/components/Home/NoBooks";
import CenterComponent from "@/components/CenterComponent";
import BookListSkeleton from "@/components/Home/BookListSkeleton";

import type { booksHave } from "@prisma/client";
import HomeCardSkeleton from "./HomeCardSkeleton";

/**
 * BookList (Server Component)
 * 
 * Handles fetching the list of books based on search parameters.
 * Moved from page.tsx to granularly stream this content using Suspense.
 */


interface props {
  page: number,
  roomId: number
}
async function BookList(props: props) {
  const session = await GetTheSession();
  const roomId = props.roomId;

  // Artificial delay to demonstrate Suspense (can be removed in production)
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  let books: Awaited<ReturnType<typeof getAvailableBooks>> = [];
  try {
    books = await getAvailableBooks(props.page, props.roomId, session?.user.id);
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  if (books.length === 0) {
    return (
      <CenterComponent>
        <NoBooks />
      </CenterComponent>
    );
  }

  return (



    <CenterComponent className="flex justify-center items-center">
      <Suspense fallback={<div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

          {
            Array.from({ length: 8 }).map((_, index) => (<div key={index} >
              <HomeCardSkeleton />
            </div>
            ))
          }
        </div>



      </div>} >


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {books.map((book) => (
            <div key={book.id}>
              <HomeCard {...book} />
            </div>
          ))}
        </div>
      </Suspense>
    </CenterComponent>
  );
}

export default BookList;
