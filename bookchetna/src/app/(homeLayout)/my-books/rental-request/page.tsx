import CenterComponent from "@/components/CenterComponent";
import BookCardWrapper from "@/components/Home/BookCardWrapper";
import RequestBookCard from "@/components/Home/RequestBookCard";
import type { RequestedBooksForApprovel } from "@/types/databaseRoutesType";
import { GetTheSession } from "@/util/GetTheSession";
import { getRentalRequestsForApproval } from "@/services/rental.service";
import { MessageCircleOff } from "lucide-react";
import { redirect } from "next/navigation";

async function Page({
  searchParams,
}: {
  searchParams: { room?: string }
}) {
  const session = await GetTheSession();
  if (!session?.user.id) {
    redirect("/");
  }

  const roomId = searchParams?.room ? Number(searchParams.room) : undefined;

  const books: RequestedBooksForApprovel[] =
    await getRentalRequestsForApproval(session.user.id, roomId);

  if (books.length === 0) {
    return (
      <CenterComponent>
        <div className="flex justify-center min-h-[50vh] flex-col gap-3 items-center">
          <MessageCircleOff className=" opacity-50 scale-200" />
          <p className="opacity-50">no request for rentals</p>
        </div>
      </CenterComponent>
    );
  }

  return (
    <>
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Rental Requests</h1>
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <RequestBookCard key={book.id} {...book} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
