import CenterComponent from "@/components/CenterComponent";
import CreateBook from "@/components/CreateBook";
import { GetTheSession } from "@/util/GetTheSession";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { Library } from "lucide-react";
import React from "react";

interface Props {}

async function Page(props: Props) {
  const _id=await GetTheSession()
  if(_id){
  const books:booksHave[]=await prisma.booksHave.findMany({where:{
      id:_id.user.id
  }})
  


}


  return (
    <>
      <CenterComponent>
        <div className="flex justify-center flex-col gap-3  items-center">
          <Library className=" opacity-50 scale-200" />
          <p className="opacity-50">You haven't posted any books yet</p>

          <CreateBook />
        </div>
      </CenterComponent>
    </>
  );
}

export default Page;
