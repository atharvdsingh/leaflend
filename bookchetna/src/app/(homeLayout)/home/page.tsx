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
import { redirect } from "next/navigation";

import FilterBar from "@/components/Home/FilterBar";
import { BookType } from "@prisma/client";

async function Page({ searchParams }: { searchParams: Promise<{ page?: string, room?: string, search?: string, category?: string }> }) {
  const session = await GetTheSession();
  const resolvedParams = await searchParams;
  if (!resolvedParams?.room) {
    redirect("/room");
  }
  const page = Number(resolvedParams?.page?.replaceAll("/", "") || "1");
  const roomId = Number(resolvedParams.room);
  const search = resolvedParams?.search || "";
  const category = resolvedParams?.category || "";

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

  if (search) {
    whereClause.OR = [
      { bookname: { contains: search, mode: 'insensitive' } },
      { author: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (category && category !== "All") {
    whereClause.bookType = category as BookType;
  }

  const totalRow = await prisma.booksHave.count({
    where: whereClause,
  });

  return (
    <>
      <FilterBar roomId={roomId} />

      <BookList page={page} roomId={roomId} search={search} category={category} />

      <Pagination
        pageNumber={page}
        totalPages={Math.ceil(totalRow / 8)}
        roomId={roomId.toString()}
        search={search}
        category={category}
      />
    </>
  );
}

export default Page;
