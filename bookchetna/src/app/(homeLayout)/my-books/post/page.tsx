import CenterComponent from "@/components/CenterComponent";
import CreateBook from "@/components/CreateBook";
import BookCardWrapper from "@/components/Home/BookCardWrapper";
import MyBooksCard from "@/components/Home/MybooksCard";
import { GetTheSession } from "@/util/GetTheSession";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { Library } from "lucide-react";

import { redirect } from "next/navigation";
import React from "react";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const _id = await GetTheSession();
  if (!_id) {
    redirect("/");
  }

  const roomId = Number((await searchParams).room);

  const books: booksHave[] = await prisma.booksHave.findMany({
    where: {
      ownerId: _id.user.id,
      ...(roomId && {
        room: { some: { roomId: roomId } },
      }),
    },
  });

  if (books.length === 0) {
    return (
      <CenterComponent>
        <div className="flex justify-center min-h-[50vh] flex-col gap-3 items-center">
          <Library className=" opacity-50 scale-200" />
          <p className="opacity-50">You haven`&apos;t posted any books yet</p>

          <CreateBook />
        </div>
      </CenterComponent>
    );
  }

  return (
    <>
      <div className=" max-w-7xl flex justify-center items-center m-auto p-4  ">
        <MyBooksCard />
      </div>
      <BookCardWrapper books={books} />
    </>
  );
}

export default Page;
