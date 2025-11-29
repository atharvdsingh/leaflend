import CenterComponent from "@/components/CenterComponent";
import HomeCard from "@/components/Home/HomeCard";
import NoBooks from "@/components/Home/NoBooks";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import React from "react";

interface Props {}

async function Page(props: Props) {
  await new Promise<void>(res => setTimeout(res, 3000));

    const books: booksHave[] = await prisma.booksHave.findMany();
    if (books.length == 0) {
      return (  
        <CenterComponent>
          <NoBooks />
        </CenterComponent>
      );
    }

  return (
    <>
      
        <CenterComponent>
          <div className=" grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 " >
            {books.map((book)=>(
              <div key={book.id} >
                <HomeCard {...book}   />
              </div>
            ))}
          </div>
          
        </CenterComponent>
    </>
  );
}

export default Page;
