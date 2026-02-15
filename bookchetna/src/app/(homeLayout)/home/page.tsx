import CenterComponent from "@/components/CenterComponent";
import HomeCard from "@/components/Home/HomeCard";
import NoBooks from "@/components/Home/NoBooks";
import PaginationWrapper from "@/components/PaginationWrapper";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import React, { Suspense } from "react";
import Pagination from "./Pagination";
import { GetTheSession } from "@/util/GetTheSession";
import { toast } from "sonner";
import { handleClientError } from "@/util/clientError";
import BookList from "@/components/Home/BookList";
import BookListSkeleton from "@/components/Home/BookListSkeleton";

async function Page({ searchParams }:{searchParams: Promise< {page:string,room:string}>}) {
  const session = await GetTheSession();
  
  console.log(await searchParams,"search params")
  const page=Number((await searchParams).page.replaceAll("/",""))
  console.log(page,"page",(await searchParams).page)
  const roomId=Number((await searchParams).room)
  console.log("hello world")

  // ---------------------------------------------------------------------------
  // OLD CODE (Moved to BookList.tsx for Granular Loading / Suspense)
  // ---------------------------------------------------------------------------
  /*
  let books;

  try {
       books = await prisma.booksHave.findMany({
      where: {
        ownerId: {
          not: session?.user.id,
        },
        room: {
          some: {
            roomId: roomId,
          },
        },
      },
  
      skip: Number((await searchParams).room) * 8 - 8,
      take: 8,
    });
    const totalRow = await prisma.booksHave.count({
      where: {
        ownerId: {
          not: session?.user.id,
        },
        room: {
          some: {
            roomId: Number((await searchParams).room),
          },
        },
      },
    });
    
  } catch (error) {
    handleClientError(error)
  }

  if (books.length == 0) {
    return (
      <CenterComponent>
        <NoBooks />
      </CenterComponent>
    );
  }
  */

  // We still need 'totalRow' for pagination, so we fetch count here (fast query) 
  // or we could move pagination into the Suspense boundary too. 
  // For now, keeping it here as it wasn't explicitly requested to move pagination.
  // HOWEVER, since 'books' query is gone, we re-fetch 'totalRow' locally 
  // or acknowledge that Pagination might render before list logic.
   const totalRow = await prisma.booksHave.count({
    where: {
      ownerId: {
        not: session?.user.id,
      },
      room: {
        some: {
          roomId: roomId,
        },
      },
    },
  });

  return (
    <>
    
        <BookList searchParams={searchParams} />

      <Pagination
        pageNumber={page}
        totalPages={Math.ceil(totalRow / 8)}
        roomId={roomId.toString()}
      />
    </>
  );
}

export default Page;
