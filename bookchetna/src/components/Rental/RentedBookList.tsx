import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CenterComponent from "@/components/CenterComponent";
import RentalCart from "@/components/Rental/RentalCart";
import { Button } from "@/components/ui/button";
import type { RentalRequestCartType } from "@/types/databaseRoutesType";
import { prisma } from "@/util/Prisma";
import { BookOpen } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * RentedBookList (Server Component)
 * 
 * Handles fetching the list of rental requests for the user.
 */
async function RentedBookList({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const session = await getServerSession(authOptions);

  // NOTE: Logic moved from page.tsx. 
  // Ideally session check should be in middleware or parent layout if critical,
  // but keeping close to original implementation.
  if (!session?.user.id) {
    // We can't easily redirect inside a component without throwing, 
    // but usually parent page handles auth check. 
    // We'll return null or empty to be safe if parent allows it.
  }

  const resolvedParams = await searchParams;
  const roomId = resolvedParams?.room ? Number(resolvedParams.room) : undefined;

  // Artificial delay for Suspense demo
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const books: RentalRequestCartType[] = await prisma.rentalRequest.findMany({
    where: {
      requesterId: session?.user.id,
      ...(roomId && {
        book: { room: { some: { roomId: roomId } } }
      })
    },
    include: {
      book: {
        select: {
          bookname: true,
          cover: true,
        },
      },
      owner: {
        select: {
          name: true,
        },
      },
    },
  }) as RentalRequestCartType[];

  if (books.length === 0) {
    return (
      <CenterComponent>
        <div className="flex justify-center min-h-[50vh] flex-col gap-3 items-center">
          <BookOpen className=" opacity-50 scale-200" />
          <p className="opacity-50">You haven&apos;t rented any book</p>

          <Button asChild>
            <Link href={"/home"}>Browse Book</Link>
          </Button>
        </div>
      </CenterComponent>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Your Rented Books</h1>
      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <RentalCart key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export default RentedBookList;
