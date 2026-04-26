import React, { Suspense } from "react";
import { prisma } from "@/util/Prisma";
import { GetTheSession } from "@/util/GetTheSession";
import { handleClientError } from "@/util/clientError";
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
  roomId: number,
  search?: string,
  category?: string
}
async function BookList(props: props) {
  const session = await GetTheSession();
  const roomId = props.roomId;

  // Artificial delay to demonstrate Suspense (can be removed in production)
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  let books: booksHave[] = [];
  try {
    const whereClause: any = {
      ownerId: {
        not: session?.user.id,
      },
      room: {
        some: {
          roomId: roomId,
        },
      },
    };

    if (props.search) {
      whereClause.OR = [
        { bookname: { contains: props.search, mode: 'insensitive' } },
        { author: { contains: props.search, mode: 'insensitive' } },
      ];
    }

    if (props.category && props.category !== "All") {
      whereClause.bookType = props.category;
    }

    books = await prisma.booksHave.findMany({
      where: whereClause,
      skip: Number(props.page) * 8 - 8, // NOTE: Logic copied from page.tsx, assuming 'room' param was meant to be used for skip or there is a logic specific to the user code.
      take: 8,                                   // In original code: skip: Number((await searchParams).room) * 8 - 8
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    // On server, we can't show toast. 
    // We could return null or empty list, or let error boundary handle it.
    // For now, empty list is safe.
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
