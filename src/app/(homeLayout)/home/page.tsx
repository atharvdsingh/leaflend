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
          <div className="flex flex-wrap gap-4 p-4 justify-evenly itemc" >
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
