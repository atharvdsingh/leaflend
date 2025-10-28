import CenterComponent from "@/components/CenterComponent";
import HomeCard from "@/components/Home/HomeCard";
import NoBooks from "@/components/Home/NoBooks";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import React from "react";

interface Props {}

async function Page(props: Props) {
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
          <div>
            {books.map((books)=>(
              <div key={books.id} >
                <HomeCard  title={books.bookname} author="" genre={books.bookType} price={""} imageURL={books.cover || "" } available={books.status}  />
              </div>
            ))}
          </div>
          
        </CenterComponent>
    </>
  );
}

export default Page;
