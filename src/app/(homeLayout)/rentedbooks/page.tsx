import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CenterComponent from "@/components/CenterComponent";
import RentBooks from "@/components/Home/RentBooks";
import RentalCart from "@/components/Rental/RentalCart";
import { Button } from "@/components/ui/button";
import { prisma } from "@/util/Prisma";
import type {  RentalRequest } from "@prisma/client";
import { BookOpen } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";


 async function Page() {

  const session= await getServerSession(authOptions)
  if(!session?.user.id){
   redirect("/")
  }
  const books:RentalRequest[]= await prisma.rentalRequest.findMany({
    where:{
      requesterId:session?.user.id
    }
  })
  if(books.length===0){
      return (
    <>
      <CenterComponent>
        <div className="flex justify-center flex-col gap-3  items-center">
          <BookOpen className=" opacity-50 scale-200" />
          <p className="opacity-50">You haven&apos;t rented any book</p>

          <Button asChild>
            <Link href={"/home"}>Browse Book</Link>
          </Button>
        </div>
      </CenterComponent>
    </>
  )
  
  }
    return (
    <>
    
    <RentalCart  name="ah"/>
    
    </>
  )


}

export default Page;
