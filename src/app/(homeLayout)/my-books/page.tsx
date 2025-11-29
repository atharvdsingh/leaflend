import CenterComponent from "@/components/CenterComponent";
import CreateBook from "@/components/CreateBook";
import MyBooksCard from "@/components/Home/MybooksCard";
import { GetTheSession } from "@/util/GetTheSession";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { Library } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
interface Props {}

async function Page(props: Props) {
  const _id=await GetTheSession()
  if(!_id){
    redirect("/")
  }
  const books:booksHave[]=await prisma.booksHave.findMany({where:{
      ownerId:_id.user.id
  }})
  console.log(books)
  if(books.length===0){
    return <CenterComponent>
        <div className="flex justify-center flex-col gap-3  items-center">
          <Library className=" opacity-50 scale-200" />
          <p className="opacity-50">You haven't posted any books yet</p>

          <CreateBook />
        </div>
      </CenterComponent>
  }
  



  return (
    <>
    <div className=" max-w-7xl m-auto flex flex-wrap gap-4 p-4 justify-evenly itemc " >

      {books.map((book)=>(
          <MyBooksCard key={book.id} {...book}  />
      ))}
      </div>      
    </>
  );
}

export default Page;
